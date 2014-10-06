$( document ).ready( function(){
	var colortabs = ["0066ff", "ff2ad4", "00d455", "ff2a2a"];
	var htmlstring = "";
	$("#main-menu").load("/club-hub/meta/main-menu.html", function(data){
	        $(".menu").find("li").each(function(index){
	                console.log(this.innerText);      
                        $(this).css("background-color", "#"+colortabs[index%4]);
	        });
	        $(".menu").find("a").each(function(){
	                $(this).hover(function(){
	                       $(this).animate({"background-color":"rgba(255,255,255,0.4)"}, 100);
	                }, function(){
	                       $(this).animate({"background-color":"rgba(255,255,255,0)"}, 2000);
	                });
                });
	});
	
	//Build page from xml data
	//Load the xml file using ajax 
        $.ajax({
                type: "GET",
                url: "main.xml",
                dataType: "xml",
                success: function (xml) {
                        console.log("Success");
                        // Parse the xml file and get data
                        var xmlDoc = $.parseXML(xml), $xml = $(xmlDoc);
                        $(xml).children("body").children("section").each(function () {
                                console.log("hey");
                                htmlstring+="<div class=\"body-box\">";
                                if($(this).children("title").html()!=undefined)
                                {
                                        htmlstring+="<h1>"+$(this).find("title").html()+"</h1>";
                                }
                                if($(this).children("content").html()!=undefined)
                                {
                                        htmlstring+="<p>"+$(this).find("content").html()+"</p>";
                                }
                                if($(this).find("feed").html()!=undefined)
                                {
                                        htmlstring+="<div class=\"feed\">";
                                        var feedurl = $(this).find("feed").text();
										console.log(feedurl);
										$.ajax({
												type: "GET",
												url: feedurl,
												dataType: "xml",
												async: false,
												success: function (feedxml) {
														console.log("Success 2");
														// Parse the xml file and get data
														var feeddoc = $.parseXML(feedxml), $feedxml = $(feeddoc);
														$(feedxml).children("feed").children("entry").each(function(){
																console.log("hay");
																htmlstring+="<div class=\"entry\">";
																if($(this).children("title").html()!=undefined)
																{
																		htmlstring+="<h2 class=\"feedtitle\">"+$(this).find("title").html()+"</h2>";
																}
																if($(this).children("author").html()!=undefined)
																{
																		htmlstring+="<p class=\"subtitle\">"+$(this).find("author").html()+"</p>";
																}
																if($(this).children("time").html()!=undefined)
																{
																		htmlstring+="<p class=\"subtitle\"><i>"+$(this).find("time").html()+"</i></p>";
																}
																if($(this).children("content").html()!=undefined)
																{
																		htmlstring+="<p class=\"feedcontent\">"+$(this).find("content").html()+"</p>";
																}
																htmlstring+="<hr />";
																htmlstring+="</div>";
														});
												}
										});
                                        htmlstring+="</div>";
                                }
								if($(this).find("calendar").html()!=undefined)
								{
										htmlstring+="<div class=\"calendar\">";
										var calendars = "";
										$(this).find("calendar").children("source").each(function(){
												calendars += $(this).text();
										});
										console.log(calendars);
										htmlstring+="<iframe src=\"https://www.google.com/calendar/embed?mode=WEEK&amp;showTitle=0&amp;height=1080&amp;wkst=1&amp;bgcolor=%23FFFFFF&amp;"+calendars+"ctz=America%2FChicago\" style=\" border-width:0 \" width=\"1920\" height=\"1080\" frameborder=\"0\" scrolling=\"no\"></iframe>";
										htmlstring+="</div>";
								}
                                htmlstring+="</div>";
                        });
						$("#main-body").append(htmlstring);
                }
        });
	
	
	$(".footer").html("<footer><p>Copyright &copy; George Moe 2014</p></footer>");
});
