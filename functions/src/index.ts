import * as functions from "firebase-functions";
import axios from "axios";

const GiphyEndpoint = "https://api.giphy.com/v1/gifs/search?q=";
const GiphyAPIkey = "N4zwkWsp8lrMbifd9SLuEX4oAmqcULpk";
const TenorEndpoint = "https://api.tenor.com/v1/search?q=";
const TenorAPIkey = "022ZP17AX73W";

const limit = 10;

const getGiphy = async (keyword: string) => {
  const giphyURL =
    GiphyEndpoint + keyword + "&api_key=" + GiphyAPIkey + "&limit=" + limit;
  const jsons = await axios.get(giphyURL);
  const data = jsons.data.data;
  const imageUrls = data.map(
    (o: { images: { downsized: { url: string } } }) => o.images.downsized.url
  );
  const gifsArray = new Array(imageUrls);
  return gifsArray[0];
};

const getTenor = async (keyword: string) => {
  const tenorURL =
    TenorEndpoint + keyword + "&key=" + TenorAPIkey + "&limit=" + limit;
  const jsons = await axios.get(tenorURL);
  const data = jsons.data.results;
  const imageUrls = data.map(
    (o: { media: { nanogif: { url: string } }[] }) => o.media[0].nanogif.url
  );
  const gifsArray = new Array(imageUrls);
  return gifsArray[0];
};

export const getGifs = functions.https.onCall(async (props) => {
  const keyword = props.keyword;
  if (!keyword) return [];
  const source = props.source;
  switch (source) {
    case "Giphy":
      return getGiphy(keyword);
    case "Tenor":
      return getTenor(keyword);
    default:
      return getGiphy(keyword);
  }
});
