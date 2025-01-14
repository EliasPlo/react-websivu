const Video = () => {
  return (
    <div>
      <h1>Video</h1>
      <div>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/4vGcH0Bk3hg"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe><br />

        <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/4vGcH0Bk3hg"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
        ></iframe>
      </div>
    </div>
  );
}

export default Video;