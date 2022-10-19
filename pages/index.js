import { Row, Col, Image, Card } from "react-bootstrap";
import PageLayout from "components/PageLayout";
import AuthorIntro from "components/AuthorIntro";
import CardItem from "components/CardItem";
import CardListItem from "components/CardListItem";
import FilteringMenu from "components/FilteringMenu";
import { useState } from "react";
import { useGetBlogs } from "actions/index";
import { getAllBlogs } from "lib/api";

export default function Home({ blogs: initialData }) {
  const [filter, setFilter] = useState({
    view: { list: 1 },
  });

  const { data: blogs, error } = useGetBlogs(initialData);

  return (
    <PageLayout className="blog-detail-page">
      <AuthorIntro />
      <FilteringMenu
        filter={filter}
        onChange={(option, value) => {
          setFilter({ ...filter, [option]: value });
        }}
      />
      <hr />
      <div className={`page-wrapper`}>
        <Row className="mb-5">
          {/* <Col md="10">
            <CardListItem />
          </Col> */}
          {blogs.map((blog) =>
            filter.view.list ? (
              <Col key={`${blog.slug}-list`} md="9">
                <CardListItem
                  author={blog.author}
                  title={blog.title}
                  subtitle={blog.subtitle}
                  date={blog.date}
                  slug={blog.slug}
                  link={{
                    href: "/blogs/[slug]",
                    as: `/blogs/${blog.slug}`,
                  }}
                />
              </Col>
            ) : (
              <Col key={blog.slug} md="4">
                <CardItem
                  author={blog.author}
                  title={blog.title}
                  subtitle={blog.subtitle}
                  date={blog.date}
                  image={blog.coverImage}
                  slug={blog.slug}
                  link={{
                    href: "/blogs/[slug]",
                    as: `/blogs/${blog.slug}`,
                  }}
                />
              </Col>
            )
          )}
        </Row>
      </div>
    </PageLayout>
  );
}

export async function getStaticProps() {
  const blogs = await getAllBlogs({offset: 0});
  return {
    props: {
      blogs,
    },
  };
}
