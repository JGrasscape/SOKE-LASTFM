var app = new Vue ({
    el: '#main',
    data: {   
        artist: '',
        artistName: '',  
        artistPic: '',    
        summary: '',  
        similarTitle: '',
        similars: '',
        genreTitle: '',
        tags: '',
        result: ''
    },
    methods: {
        getArtist: function(artist) {
            // Haetaan artistin tiedot Last.fm rajapinnasta
            axios.get('http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist='+artist+'&api_key=a9d080270634ad741de3ea9de4ab43a1&format=json').then(function (response) {
                app.artistName = response.data.artist.name;
                app.artistPic = response.data.artist.image[0]['#text'];
                app.summary = response.data.artist.bio.summary;
                app.genreTitle = 'Genret:';
                app.tags = response.data.artist.tags.tag; 
                app.similarTitle = 'Samankaltaisia artisteja:';
                app.similars = response.data.artist.similar.artist;
            })
            .catch(function (error) {
                app.result = 'Error ! Could not reach the API. ' + error;
            })
        },        
        getGenre: function(genre) {
            // Haetaan genret tiedot Last.fm rajapinnasta
            axios.get('http://ws.audioscrobbler.com/2.0/?method=tag.getinfo&tag='+genre+'&api_key=a9d080270634ad741de3ea9de4ab43a1&format=json').then(function (response)
            {
                app.artistName = response.data.tag.name;
                app.artistPic = '';
                app.summary = response.data.tag.wiki.summary;
                app.genreTitle = '';
                app.tags = ''; 
            })
            .catch(function (error) {
                app.result = 'Error ! Could not reach the API. ' + error;
            })
            // Haetaan genret artistit Last.fm rajapinnasta
            axios.get('http://ws.audioscrobbler.com/2.0/?method=tag.gettopartists&tag='+genre+'&api_key=a9d080270634ad741de3ea9de4ab43a1&format=json').then(function (response)
            {
                app.similarTitle = 'Genren artisteja:';
                app.similars = response.data.topartists.artist;
            })
            .catch(function (error) {
                app.result = 'Error ! Could not reach the API. ' + error;
            })
        }
    }
});
