import * as functions from "firebase-functions";
import axios from "axios";
import { createTransport } from "nodemailer";

// get GIF
const GiphyEndpoint = "https://api.giphy.com/v1/gifs/search?q=";
const GiphyAPIkey = "N4zwkWsp8lrMbifd9SLuEX4oAmqcULpk";
const TenorEndpoint = "https://api.tenor.com/v1/search?q=";
const TenorAPIkey = "022ZP17AX73W";

const limit = 10;

const getGiphy = async (keyword: string) => {
  const encodeKeyword = encodeURI(keyword);
  const giphyURL =
    GiphyEndpoint +
    encodeKeyword +
    "&api_key=" +
    GiphyAPIkey +
    "&limit=" +
    limit;
  const jsons = await axios.get(giphyURL);
  const data = jsons.data.data;
  const imageUrls = data.map(
    (o: { images: { downsized: { url: string } } }) => o.images.downsized.url
  );
  const gifsArray = new Array(imageUrls);
  return gifsArray[0];
};

const getTenor = async (keyword: string) => {
  const encodeKeyword = encodeURI(keyword);
  const tenorURL =
    TenorEndpoint + encodeKeyword + "&key=" + TenorAPIkey + "&limit=" + limit;
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

// contact
const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;
const gmailDestination = functions.config().gmail.destination;
const mailTransport = createTransport({
  host: "gmail",
  secure: true,
  auth: {
    user: gmailEmail,
    pass: gmailPassword,
  },
});

export const submitEmail = functions.https.onCall((data) => {
  const email = {
    from: gmailEmail,
    to: gmailDestination,
    text: `
    name
    ${data.name}

    email
    ${data.email}

    message
    ${data.message}
    `,
  };

  mailTransport.sendMail(email).catch((error) => console.log(error));
});
