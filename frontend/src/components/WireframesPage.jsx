import Wireframe from "./wireframe";

export default function WireframesPage() {
  const wireframeList = [
    {
      imgUrl: "/frontPage.jpg",
      title: "Front page",
    },
    {
      imgUrl: "/addProject.jpg",
      title: "Add project page",
    },
    {
      imgUrl: "/contact.jpg",
      title: "Contact page",
    },
  ];

  return (
    <>
      <section id="wireframesContainer">
        <h1>Wireframes:</h1>
        {wireframeList.map((element, index) => (
          <Wireframe
            key={index}
            imgUrl={element.imgUrl}
            title={element.title}
          />
        ))}
      </section>
    </>
  );
}
