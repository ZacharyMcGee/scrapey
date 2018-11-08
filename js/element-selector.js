$("#iframe").on('load', function(){
   var frm = $("#iframe").get(0);
   var doc = (frm.contentDocument ? frm.contentDocument : frm.contentWindow.document); //here is your document object
   var bdy = doc.body;

   $(bdy).on("click", "*", function (e) {
       console.log($(e.target).attr("class"));//To get class name
   });
});
