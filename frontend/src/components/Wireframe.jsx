export default function Wireframe({ imgUrl, title }) {
  return (
    <>
      <a href={imgUrl} target="_blank">
        <article className="wireframeArticle">
          <img src={imgUrl} />
          <h2>{title}</h2>
        </article>
      </a>
    </>
  );
}
