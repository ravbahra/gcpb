var ctp = {
    currentregion: 'na',
    current_service: 'na',

    current_test_progress: 0,
    total_tests: 0,//set
    total_tests_completed: 0, //set

    downlink_progress_percent: 0,
    downlink_total_tests: 0, //set
    downlink_tests_completed: 0,

    dns_progress_percent: 0,
    dns_total_tests: 0, //set
    dns_tests_completed: 0,

    latency_progress_percent: 0,
    latency_total_tests: 0, //set
    latency_tests_completed: 0,


};


var currProgressComponent = new Ractive({
    el: '#progresscontainer',
    template: '#templateprogress',
    data: {
        progressdata: ctp
    }

});


var testProgressComponent = new Ractive({
    el: '#tablecontainer',
    template: '#templatetests',
    data: {
        compute: {},
        storage:{},
        cdn:{},
        dns:{},
        selecteddisplay:'median',
        current_svc:'na',
        current_reg:'na'
    }
});


var googleComputeSVG = new Ractive({
    el:'#googlecomputesvg',
    template: '#templategooglecompute'
});

var googleStorageSVG = new Ractive({
    el:'#googlestoragesvg',
    template: '#templategooglestorage'
});


var googlecdnSVG = new Ractive({
    el:'#googlecdnsvg',
    template: '#templategooglecdn'
});

var googlednsSVG = new Ractive({
    el:'#googlednssvg',
    template: '#templategoogledns'
});



/*
function createDataStructure(ch_table){

}
*/

