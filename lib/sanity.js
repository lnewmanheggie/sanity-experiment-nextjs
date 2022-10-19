import sanityClient from "@sanity/client";

const options = {
  dataset: `${process.env.SANITY_DATASET_NAME}`,
  projectId: `${process.env.SANITY_PROJECT_ID}`,
  useCdn: process.env.NODE_ENV === "production",
  // useCdn === true, will give you faster response, but cached data
};

export default sanityClient(options);
