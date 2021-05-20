export default images =>
  images
    .map(
      ({ webformatURL, largeImageURL, likes, views, comments, downloads }) =>
        `<div class='photo-card'>
    <img
      src=${webformatURL}
      data-img=${largeImageURL}
      alt=''
      width='300'
      height='210'
    />

    <div class='stats'>
      <p class='stats-item'>
        <i class='material-icons'>thumb_up</i>
        ${likes}
      </p>
      <p class='stats-item'>
        <i class='material-icons'>visibility</i>
        ${views}
      </p>
      <p class='stats-item'>
        <i class='material-icons'>comment</i>
        ${comments}
      </p>
      <p class='stats-item'>
        <i class='material-icons'>cloud_download</i>
        ${downloads}
      </p>
    </div>
  </div>`,
    )
    .join('');
