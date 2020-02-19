var app = new Vue ({
    el: '#main',
    data: {   
        artist: '',
        artistName: '',  
        artistPic: '',    
        summary: '',  
        similarTitle: '',
        similars: '',
        result: ''
    },
    methods: {
        testApi: function() {
            axios.get('http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=Cher&api_key=a9d080270634ad741de3ea9de4ab43a1&format=json').then(function (response) {
              app.result = response.data;              
            })
            .catch(function (error) {
              app.result = 'Error ! Could not reach the API. ' + error;
            })
        },
        getArtist: function() {
        axios.get('http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist='+this.artist+'&api_key=a9d080270634ad741de3ea9de4ab43a1&format=json').then(function (response) {
            app.artistName = response.data.artist.name;
            app.artistPic = response.data.artist.image[0]['#text'];
            app.summary = response.data.artist.bio.summary;
            app.similarTitle = 'Samankaltaisia artisteja:';
            app.similars = response.data.artist.similar.artist;            

            app.result = response.data;              
        })
        .catch(function (error) {
            app.result = 'Error ! Could not reach the API. ' + error;
        })
        }
    }
});

//https://lastfm.freetls.fastly.net/i/u/770x0/055b370c91da4ebba47ecc7aa3a37c5f.webp#055b370c91da4ebba47ecc7aa3a37c5f