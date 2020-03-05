var app = new Vue ({
    el: '#main',
    data: {   
        apiKey: '',
        askApi: true,
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
        clearView: function() {
            this.artist = '',
            this.artistName = '',  
            this.artistPic = '',    
            this.summary = '',  
            this.similarTitle = '',
            this.similars = '',
            this.genreTitle = '',
            this.tags = '',
            this.result = ''
        },
        getApiKey: function(apiKey) {
            this.apiKey = apiKey;            
            
            // Testataan API key
            axios
                .get('https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=Cher&api_key='+this.apiKey+'&format=json')
                .then(response => {
                    // Onnistui, piilotetaan API key kysely ja näytetään artistin haku
                    app.result = 'API key hyväksytty, jatka hakemalla artistia/yhtyettä.';
                    this.askApi = false;
                })
                .catch(error => {
                    // Epäonnistui, tulostetaan error ja pyydetään toista API keytä                      
                    this.askApi = true;
                    this.apiKey = '';            
                    app.result = 'Error! ' + error.data.message;
                })  
        },
        getArtist: function(artist) {
            // Haetaan artistin tiedot Last.fm rajapinnasta
            axios.get('https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist='+artist+'&api_key='+this.apiKey+'&format=json').then(response => {
                app.clearView();
                app.artistName = response.data.artist.name;
                app.artistPic = response.data.artist.image[0]['#text'];
                app.summary = response.data.artist.bio.summary;
                app.genreTitle = 'Genret:';
                app.tags = response.data.artist.tags.tag; 
                app.similarTitle = 'Samankaltaisia artisteja:';
                app.similars = response.data.artist.similar.artist;
            })
            .catch(function (error) {
                app.clearView();
                app.result = 'Error! ' + error;
            })
        },        
        getGenre: function(genre) {
            // Haetaan genret tiedot Last.fm rajapinnasta
            axios.get('https://ws.audioscrobbler.com/2.0/?method=tag.getinfo&tag='+genre+'&api_key='+this.apiKey+'&format=json').then(response => {
                app.clearView();
                app.artistName = response.data.tag.name;
                app.summary = response.data.tag.wiki.summary;
            })
            .catch(function (error) {
                app.clearView();
                app.result = 'Error! ' + error;
            })
            // Haetaan genret artistit Last.fm rajapinnasta
            axios.get('https://ws.audioscrobbler.com/2.0/?method=tag.gettopartists&tag='+genre+'&api_key='+this.apiKey+'&format=json').then(response => {
                app.similarTitle = 'Genren artisteja:';
                app.similars = response.data.topartists.artist;
            })
            .catch(function (error) {
                app.clearView();
                app.result = 'Error! ' + error;
            })
        }
    }
});
