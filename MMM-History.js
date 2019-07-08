/* Magic Mirror
    * Module: MMM-History
    *
    * By cowboysdude
    * 
    */
   
Module.register("MMM-History", {
       
        requiresVersion: "2.1.0",
       
       // Module config defaults.
       defaults: {
           updateInterval: 60*1000, // every 10 minutes
           animationSpeed: 10,
           initialLoadDelay: 4950, // 0 seconds delay
           retryDelay: 1500,
           maxWidth: "400px",
           fadeSpeed: 11,
           rotateInterval: 20 * 1000,
           maxLength: null
       },
       
       // Define required scripts.
       getScripts: function() {
           return ["moment.js"];
       },
       
       getStyles: function() {
           return ["MMM-History.css"];
       },

       // Define start sequence.
       start: function() {
           Log.info("Starting module: " + this.name);
           
           requiresVersion: "2.1.0",
           
           // Set locale.
           this.locale = window.navigator.userLanguage || window.navigator.language;
           this.url = "http://feeds.feedburner.com/day/MNbM?format=xml";
           this.history = {};
           this.today = "";
           this.activeItem = 0;
           this.rotateInterval = null;
           this.scheduleUpdate();
       },
       
       processHistory: function(data) {
         this.today = data.Today;
         this.history = data;
         this.loaded = true;
     },
     
      scheduleCarousel: function() {
       		console.log("Scheduling History items");
	   		this.rotateInterval = setInterval(() => {
				this.activeItem++;
				this.updateDom(this.config.animationSpeed);
			}, this.config.rotateInterval);
	   },
     
     scheduleUpdate: function() {
         setInterval(() => {
             this.getHistory();
         }, this.config.updateInterval);
         this.getHistory(this.config.initialLoadDelay);
         var self = this;
     },

     getHistory: function() {
         this.sendSocketNotification('GET_HISTORY', this.url);
     },

     socketNotificationReceived: function(notification, payload) {
         if (notification === "HISTORY_RESULT") {
             this.processHistory(payload);
             if(this.rotateInterval == null){
			   	this.scheduleCarousel();
			   }
               this.updateDom(this.config.animationSpeed);
         }
         this.updateDom(this.config.initialLoadDelay);
     },

      getDom: function() {
         
         var history = this.history;
         moment.locale(this.locale);

         var wrapper = document.createElement("div");
         wrapper.className = "wrapper";
         wrapper.style.maxWidth = this.config.maxWidth;
         
         var header = document.createElement("header");
         header.classList.add("xsmall", "bright", "header");
         header.innerHTML = "Today in History";
         wrapper.appendChild(header);
         
          var hkeys = Object.keys(this.history);
			if(hkeys.length > 0){
           	if(this.activeItem >= hkeys.length){
				this.activeItem = 0;
			}
         var history = this.history[hkeys[this.activeItem]];

         var top = document.createElement("div");
         top.classList.add("content");

         var hitem = document.createElement("p");
         hitem.classList.add("xsmall", "bright", "title");
		 if (this.config.maxLength && this.config.maxLength < history.title.toString().length) {
			hitem.innerHTML = history.title.toString().substring(0, this.config.maxLength) + "\u2026";			 
		 } else {
			hitem.innerHTML = history.title;
		}
         top.appendChild(hitem);

         wrapper.appendChild(top);
         }
         return wrapper;
     },
 });
