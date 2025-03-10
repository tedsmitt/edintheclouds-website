import React, { useContext } from 'react';

import Image from 'next/image';

import AppleMusicPlayer from 'src/components/apple-music-player/apple-music-player';
import Banner from 'src/components/banner';
import BlogPostCard from 'src/components/blog-post-card';
import CloudParrallax from 'src/components/cloud-parrallax';
import MaxWidthWrapper from 'src/components/max-width-wrapper/max-width-wrapper';
import { DisplayContext } from 'src/context/display';
import { getPostsDatabase } from 'src/lib/notion';

import * as Styled from './index.styles';

interface IHomeProps {
  posts: any;
}

function Home({ posts }: IHomeProps) {
  const { activeTheme, showNav, browser } = useContext(DisplayContext);
  const [bannerLoaded, setBannerLoaded] = React.useState(false);

  // handleNotchBackground figures out the bg color for the iPhone notch
  const handleNotchBackground = (theme: 'light' | 'dark' | undefined) => {
    let color;
    if (theme === 'light') {
      color = showNav ? 'white' : '#c7f1ff';
    }
    if (theme === 'dark') {
      color = showNav ? '#363537' : '#3b4c69';
    }
    return color;
  };

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            html {
              background-color: ${handleNotchBackground(activeTheme)};
              transition: background-color 0.5s ease;
              transition-delay: var(--theme-transition-delay);
            }   `,
        }}
      />
      <Banner.Wrapper>
        <CloudParrallax />
        <div
          style={{
            opacity: bannerLoaded ? 1 : 0,
            transition: 'all 1s ease',
          }}
        >
          <Styled.VideoWrapper>
            {browser === 'chrome' || browser === 'firefox' ? (
              <Styled.Video
                autoPlay
                loop
                muted
                playsInline
                onLoadedData={() => setBannerLoaded(true)}
              >
                <source
                  src="assets/animations/edintheclouds-logo-float-lg.webm"
                  type="video/webm"
                />
              </Styled.Video>
            ) : (
              <Image
                src="/assets/svg/edintheclouds-logo.svg"
                alt="logo"
                width={700}
                height={800}
                onLoadingComplete={() => setBannerLoaded(true)}
                sizes="(max-width: 568px) 100vw,
								50vh"
              />
            )}
          </Styled.VideoWrapper>
        </div>
      </Banner.Wrapper>

      <Styled.SectionWrapper>
        <MaxWidthWrapper>
          <Styled.ContentCard>
            <Styled.StrongL>{`Hi, I'm Ed.`}</Styled.StrongL>
            <Styled.TextM>{`I'm an independent Platform/Cloud/DevOps Engineer based in Manchester, UK 🇬🇧`}</Styled.TextM>
            <Styled.StrongM>{`I'm in my happy place when I'm ...`}</Styled.StrongM>
            <Styled.ListHappyPlace>
              <li>⚙️ Scripting and automating stuff</li>
              <li>🧑‍💻 Improving developer experience</li>
              <li>🏗 Building and engineering cloud infrastructure</li>
              <li>🛠 Writing code and creating tools to help make life easier</li>
              <li>🎓 Learning!</li>
            </Styled.ListHappyPlace>
            <Styled.StrongM>{`What can I do?`}</Styled.StrongM>
            <Styled.TextS>
              {`If you are interested in engaging my services, please get in touch for a copy of my CV`}
            </Styled.TextS>
            <Styled.TextS>
              {`You can reach me via email me at `}
              <a
                href="mailto:ed@edintheclouds.io"
                style={{ color: 'var(--blue)', fontWeight: 700 }}
              >
                ed@edintheclouds.io
              </a>
            </Styled.TextS>
            <Styled.TextS>
              {`...or you can connect with me on `}
              <a
                href="https://www.linkedin.com/in/edwardsmith92/"
                target="_blank"
                rel="noreferrer"
                style={{ color: 'var(--blue)', fontWeight: 700 }}
              >
                LinkedIn
              </a>
            </Styled.TextS>
            <Styled.TextS>
              {`...or DM me on `}
              <a
                href="https://twitter.com/_edintheclouds"
                target="_blank"
                rel="noreferrer"
                style={{ color: 'var(--blue)', fontWeight: 700 }}
              >
                Twitter
              </a>
              {`!`}
            </Styled.TextS>
          </Styled.ContentCard>
        </MaxWidthWrapper>
      </Styled.SectionWrapper>

      <Styled.SectionWrapper>
        <MaxWidthWrapper>
          <Styled.SectionHeading>Latest Posts 📝</Styled.SectionHeading>
          <Styled.BlogPosts>
            {posts.map(
              (
                { id, properties }: { id: string; properties: any; created_time: string },
                i: number
              ) => (
                <BlogPostCard
                  key={i}
                  id={id}
                  date={properties.Date.date.start}
                  title={properties.Title.title[0].plain_text}
                  tags={properties.Tags.multi_select}
                  description={properties.Description.rich_text[0].plain_text}
                />
              )
            )}
          </Styled.BlogPosts>
        </MaxWidthWrapper>
      </Styled.SectionWrapper>

      <Styled.SectionWrapper>
        <MaxWidthWrapper>
          <Styled.FunStuff>
            <AppleMusicPlayer />
            {/*             <Styled.ContentCard style={{ margin: 0, flexBasis: '66.6%', maxHeight: '350px' }}>
              <Styled.TextS>Outside of work I enjoy</Styled.TextS>
              <Styled.ListHappyPlace>
                <li>Doing a bit of coding/development</li>
                <li>Going for a pint</li>
                <li>Playing Xbox (specifically Deep Rock Galactic!)</li>
              </Styled.ListHappyPlace>
            </Styled.ContentCard> */}
          </Styled.FunStuff>
        </MaxWidthWrapper>
      </Styled.SectionWrapper>
    </>
  );
}

export async function getStaticProps() {
  const postDatabase = await getPostsDatabase(process.env.NOTION_DATABASE_ID || '');

  // only show the 4 most recent posts
  const posts = postDatabase?.slice(0, 4);

  return {
    props: {
      posts,
    },
    revalidate: 1,
  };
}

export default Home;
