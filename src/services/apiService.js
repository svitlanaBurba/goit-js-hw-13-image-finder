export default class ImagesApiService {
  constructor() {
    this.requestUrl = 'https://pixabay.com/api';
    this.searchQuery = '';
    this.page = 1;
  }

  fetchImages() {
    console.log(this);
    const url = `${this.requestUrl}/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=21693687-d312e4baa20e789348b176d28`;

    return fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject('Something went wrong');
        // throw new Error("Something went wrong");
      })
      .then(images => {
        this.incrementPage();
        return images.hits;
      });
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
