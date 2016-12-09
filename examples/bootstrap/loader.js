var steps = [
    {
        text : "step 1",
        err: "err 1"
    },
    {
        text:"step 2",
        err:"err 2"
    },
    {
        text:"step3",
        err :"err3"
    }
]

var pageLoader;
$(document).ready(function(){
    pageLoader = new BootstrapLoader({
        template:$('#pageLoader'),
        useTemplate:true,
        steps : steps
    }).goStart();
});