$(document).ready(function(){
   $('.btn-black').click(function myfun(){
        $('ul').toggleClass('active');
      
    
   });
});

$(document).ready(function(){
 
    $("#course").click(function course(){
        $('.course').toggleClass('courses');
        var win= $(window).width();
        if(win < 900){
            $('section').hide();
        }
       
    });
});
