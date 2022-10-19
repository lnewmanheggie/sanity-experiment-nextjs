import PageLayout from "components/PageLayout";
import { Row, Col } from "react-bootstrap";
import { useRouter } from "next/router";
import { getBlogBySlug, getAllBlogs } from "lib/api";
import BlogHeader from "components/BlogHeader";
import BlogContent from "components/BlogContent";
import { urlFor } from "lib/api";
import ErrorPage from "next/error";

const BlogDetail = ({ blog }) => {
  const router = useRouter();

  if (!router.isFallback && !blog?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  if (router.isFallback) {
    return <PageLayout className="blog-detail-page">... Loading</PageLayout>;
  }

  return (
    <PageLayout className="blog-detail-page">
      <Row>
        <Col md={{ span: 10, offset: 1 }}>
          <BlogHeader
            title={blog.title}
            subtitle={blog.subtitle}
            coverImage={urlFor(blog.coverImage).height(400).url()}
            author={blog.author}
            date={blog.date}
          />
          <hr />
          <BlogContent content={blog.content} />
        </Col>
      </Row>
    </PageLayout>
  );
};

export async function getStaticProps({ params }) {
  const blog = await getBlogBySlug(params.slug);
  return {
    props: { blog },
  };
}

export async function getStaticPaths() {
  const blogs = await getAllBlogs();

  return {
    paths: blogs?.map((b) => ({
      params: { slug: b.slug },
    })),
    fallback: false,
  };
}

export default BlogDetail;
