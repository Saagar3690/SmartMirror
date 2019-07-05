/* Magic Mirror Config Sample
 *
 * By Michael Teeuw http://michaelteeuw.nl
 * MIT Licensed.
 *
 * For more information how you can configurate this file
 * See https://github.com/MichMich/MagicMirror#configuration
 *
 */

var config = {
	address : "0.0.0.0",
    port: 8080,
    ipWhitelist: [":ffff:0.0.0.0/1", "::fff:128.0.0.0/2", "::ffff:192.0.0.0/3", "::fff:224.0.0.0/4", "127.0.0.1", "::ffff:127.0.0.1", "::1", "10.31.64.69/24", "10.246.156.85/24", "10.246.147.209/24", "10.31.64.86/24"],
    //address: "localhost", // Address to listen on, can be:
	                      // - "localhost", "127.0.0.1", "::1" to listen on loopback interface
	                      // - another specific IPv4/6 to listen on a specific interface
	                      // - "", "0.0.0.0", "::" to listen on any interface
	                      // Default, when address config is left out, is "localhost"
	//port: 8080,
	//ipWhitelist: ["127.0.0.1", "::ffff:127.0.0.1", "::1"], // Set [] to allow all IP addresses
	                                                       // or add a specific IPv4 of 192.168.1.5 :
	                                                       // ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.1.5"],
	                                                       // or IPv4 range of 192.168.3.0 --> 192.168.3.15 use CIDR format :
	                                                       // ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.3.0/28"],

	language: "en",
	timeFormat: 12,
	units: "imperial",

	modules: [
		{
			module: "clock",
			position: "top_left"
		},
		{
			module: "MMM-History",
			position: "top_left",
			config: {
				maxWidth: "325px"
			}
		},
		{
			module: "calendar",
			header: "Saagar's Calendar",
			position: "top_left",
			config: {
				calendars: [
					{
						symbol: "Saagar",
						url: "https://calendar.google.com/calendar/ical/saagar.mahadev123%40gmail.com/private-fd6e01692a2db4e977df6a02e90f86a0/basic.ics"
					},
					{
						symbol: "calendar",
						url: "https://www.calendarlabs.com/ical-calendar/ics/76/US_Holidays.ics",
					},
				]
			}
		},
		{
			module: "MMM-MyCommute",
			position: "top_left",
			header: "Traffic",
			classes: "default everyone",
		},
		{
			module: "compliments",
			position: "middle_center"
		},
		{
			module: "MMM-quote-of-the-day",
			position: "bottom_center",
			config: {
				language: "en",
				updateInterval: "20s"
			}
		},
		{
			module: "currentweather",
			position: "top_right",
			config: {
				location: "",
				locationID: "5341145",  //ID from http://bulk.openweathermap.org/sample/; unzip the gz file and find your city
				appid: "d717de6257cf8dc35aaf311ffe885ac9",
			}
		},
		{
			module: "weatherforecast",
			position: "top_right",	// This can be any of the regions.
										// Best results in left or right regions.
			config: {
				location: "",
				locationID: "5341145",  //ID from http://bulk.openweathermap.org/sample/; unzip the gz file and find your city
				appid: "d717de6257cf8dc35aaf311ffe885ac9",
			}
		},
		{
			module: "MMM-MyScoreboard",
			position: "top_left",
			classes: "default everyone",
			header: "My Scoreboard",
		},
		{
			module: "MMM-Spotify",
			position: "top_right",
		},
		/*{
			module: "MMM-Remote-Control",
			position: "bottom_left",
		},*/
		{
			module: "newsfeed",
			position: "top_left",
			header: "News",
			config: {
				feeds: [
					{
						title: "New York Times",
						url: "http://www.nytimes.com/services/xml/rss/nyt/HomePage.xml"
					},
				],
				showSourceTitle: false,
				showPublishDate: false
			}
		},
		/*{
			module: "MMM-Mail",
			position: "top_left",
			header: "Email",
			config: {
				user: "saagar.mahadev123@gmail.com",
				pass: "",
				host: "imap.gmail.com",
				port: 993,
				numberOfEmails: 5,
				fade: true,
				subjectLength: 50
			},
		},*/
		/*{
				module: 'email',
                position: 'top_left',
                header: 'Email',
                config: {
                    accounts: [
                        {
                            user: 'saagar.mahadev123@gmail.com',
                            password: '',
                            host: 'imap.google.com',
                            port: 993,
                            tls: true,
                            authTimeout: 10000,
                            numberOfEmails: 2,

                        },
                    ],
                    fade: false,
                    maxCharacters: 30
                }
		},*/
		{
			module: "MMM-Reddit",
			position: "top_left",
		},
		/*{
			disabled: false,
			module: "MMM-SunRiseSet",
			position: "top_right",
			config: {
				lat: "37.3229978",
				lng: "-122.0321823",
				image: "world",
				imageOnly: "yes",
				dayOrNight: "night",
				useHeader: false,
				maxWidth: "200px",
			},
		},*/
		{
			module: "MMM-Remote-Control",
			position: "bottom_right",
			disabled: false,
			// uncomment the following line to show the URL of the remote control on the mirror
			// , position: 'bottom_left'
			// you can hide this module afterwards from the remote control itself
			config: {
				customCommand: {},  // Optional, See "Using Custom Commands" below
				customMenu: "custom_menu.json", // Optional, See "Custom Menu Items" below
				showModuleApiMenu: true, // Optional, Enable the Module Controls menu
				apiKey: "",         // Optional, See API/README.md for details
			}
		},
		{
			module: "MMM-Hotword",
			position: "top_right",
			config: {
				chimeOnFinish: null,
				mic: {
					recordProgram: "arecord",
					device: "plughw:1"
				},
				models: [
					{
						hotwords    : "smart_mirror",
						file        : "smart_mirror.umdl",
						sensitivity : "0.5",
					},
				],
				commands: {
					"smart_mirror": {
						notificationExec: {
							notification: "ASSISTANT_ACTIVATE",
							payload: (detected, afterRecord) => {
								return {profile:"default"}
							}
						},
						restart:false,
						afterRecordLimit:0
					}
				}
			}
		},
		{
			module: "MMM-AssistantMk2",
			position: "top_right",
			config: {
				deviceLocation: {
					coordinates: {
						latitude: 37.3229978, // -90.0 - +90.0
						longitude: -122.0321823, // -180.0 - +180.0
					},
				},
				record: {
					recordProgram : "arecord",  
					device        : "plughw:1",
				},
				notifications: {
					ASSISTANT_ACTIVATED: "HOTWORD_PAUSE",
					ASSISTANT_DEACTIVATED: "HOTWORD_RESUME",
				},
				useWelcomeMessage: "brief today",
				profiles: {
					"default" : {
						lang: "en-US"
					}
				},
			}
		},
		{
			module: "MMM-PIR-Sensor",
			config: {
				sensorPin: 17
			}
		},
	]

};

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== "undefined") {module.exports = config;}
