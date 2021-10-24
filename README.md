# Coming Up Next...

See [vercel](https://vercel.com/) deployment [here](https://coming-up-next.vercel.app/)

![Coming up next... logo](https://res.cloudinary.com/wdybih/image/upload/v1634935739/favicons/android-chrome-192x192_gcvmga.png)

Simple service to check out info about upcoming movies.  
Very handy when API provides sufficient data.

**NB:**  
There are couple of experiments going on with the code,  
choice of APIs and development solutions are exaggerated on purpose.  

## Main tools and Services

- [Create React App](https://create-react-app.dev/)
- [React-Redux](https://react-redux.js.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Choom](https://www.npmjs.com/package/choom)
- [Rapid API](https://rapidapi.com/) 
- [IMDb API](https://imdb-api.com/api)
- [MongoDB](https://www.mongodb.com/)
- [Vercel Serverless Functions](https://vercel.com/)

## Extra resources

- [React Feather](https://feathericons.com/)
- [Google Fonts](https://fonts.google.com/)

## Local development

```sh
yarn install
yarn dev
```

### .env

```
# Rapid API key
REACT_APP_RAPIDAPI_KEY = xxxxx

# IMDb API
REACT_APP_IMDBAPI_KEY = xxxxx

# list size
REACT_APP_ITEM_LIMIT = 5

# DB settings
COMING_UP_MONGODB_ID = xxxxx
COMING_UP_MONGODB_COLLECTION = xxxxx
COMING_UP_MONGODB_PATH = xxxxx.mongodb.net
COMING_UP_MONGODB_USER = xxxxx
COMING_UP_MONGODB_PWD = xxxxx
```

### Theming

See `src/theme.css` for tweaking theme variables.

## [LICENSE](LICENSE)
