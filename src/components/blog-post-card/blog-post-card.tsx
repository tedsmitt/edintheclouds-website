import Link from 'next/link';

import Tag from 'src/components/tag';

import * as Styled from './blog-post-card.styles';

export default function BlogPostCard({
  id,
  date,
  title,
  tags,
  description,
}: {
  id: string;
  date: string;
  title: string;
  tags: { id: string; name: string; color: string }[];
  description: string;
}) {
  return (
    <Link passHref href={`/posts/${id}`}>
      <Styled.Card key={id}>
        <Styled.CardTitle>{title}</Styled.CardTitle>
        <Styled.CardDescription>{description}</Styled.CardDescription>
        <small style={{ fontWeight: 500, color: 'var(--color-light-blue)' }}>
          {new Date(date).toLocaleDateString('en-GB', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </small>
        <Styled.TagContainer>
          {tags.map((t, i) => (
            <Tag key={i} color={t.color}>
              {t.name}
            </Tag>
          ))}
        </Styled.TagContainer>
      </Styled.Card>
    </Link>
  );
}
