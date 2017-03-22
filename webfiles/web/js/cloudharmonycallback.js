var gb_test_list = '';

var totalCircle = new ProgressBar.Circle('#total_progress_container', {
    color: '#FCB03C',
    strokeWidth: 3,
    trailWidth: 1,
});
var dnsCircle = new ProgressBar.Circle('#dns_progress_container', {
    color: '#FCB03C',
    strokeWidth: 3,
    trailWidth: 1,
});
var downlinkCircle = new ProgressBar.Circle('#downlink_progress_container', {
    color: '#FCB03C',
    strokeWidth: 3,
    trailWidth: 1,
});
var latencyCircle = new ProgressBar.Circle('#latency_progress_container', {
    color: '#FCB03C',
    strokeWidth: 3,
    trailWidth: 1,
});


function initStats() {
    var totalTests = gb_test_list.length;

    var total_dns_tests = _.filter(gb_test_list, function (e) { return e.type == 'dns' }).length;
    var total_downlink_tests = _.filter(gb_test_list, function (e) { return e.type == 'downlink' }).length;
    var total_latency_tests = _.filter(gb_test_list, function (e) { return e.type == 'latency' }).length;



    currProgressComponent.set('progressdata.total_tests', totalTests);
    currProgressComponent.set('progressdata.dns_total_tests', total_dns_tests);
    currProgressComponent.set('progressdata.downlink_total_tests', total_downlink_tests);
    currProgressComponent.set('progressdata.latency_total_tests', total_latency_tests);


    //create the main data table
    testProgressComponent.set('compute', createTableObject('compute', gb_test_list));
    testProgressComponent.set('storage', createTableObject('storage', gb_test_list));
    testProgressComponent.set('cdn',new progressObject('noregion'));
    testProgressComponent.set('dns',new progressObject('noregion'));


}
function updateProgress(testNum, progress) {
    var testrow = gb_test_list[testNum];
    var current_region = '';
    var current_service = ''
    var testtype = '';
    var currTestProgress = progress.progress;
    //var complete_tests_remaining = progress.tests_remaining;

    var type_progress = progress.type_progress;
    var circleTypeProgress = (type_progress / 100).toFixed(2);
    //var type_remaining = progress.type_remaining;

    if (testrow.type == 'downlink') {
        if (testrow.concurrency == 2) {
            testtype = 'downlink2';
        } else {
            testtype = 'downlink4';
        }

        currProgressComponent.set('progressdata.downlink_progress_percent', type_progress);
        downlinkCircle.set(circleTypeProgress);
        downlinkCircle.setText(type_progress.toFixed(2) + '%');
        //currProgressComponent.set('progressdata.downlink_tests_remaining', type_remaining);

    }
    if (testrow.type == 'latency') {
        testtype = 'latency';
        currProgressComponent.set('progressdata.latency_progress_percent', type_progress);
        latencyCircle.set(circleTypeProgress);
        latencyCircle.setText(type_progress.toFixed(2) + '%');

        //currProgressComponent.set('progressdata.latency_tests_remaining', type_remaining);
    }

    currProgressComponent.set('progressdata.current_test_progress', currTestProgress);

    totalCircle.set((currTestProgress/100).toFixed(2));
    totalCircle.setText(currTestProgress.toFixed(2) + '%');
    //currProgressComponent.set('progressdata.total_tests_remaining', complete_tests_remaining);

    if (testrow.service_type == 'dns') {
        current_service = 'dns';
        currProgressComponent.set('progressdata.dns_progress_percent', type_progress);
        //currProgressComponent.set('progressdata.dns_tests_remaining', type_remaining);
        dnsCircle.set(circleTypeProgress);
        dnsCircle.setText(type_progress.toFixed(2) + '%');
        //dns always latency
        testProgressComponent.set(current_service + '.latency.progress', progress.progress);
        testProgressComponent.set('current_svc', 'dns');
        testProgressComponent.set('current_reg', 'noregion');


        current_region = 'noregion';
    }
    if (testrow.service_type == 'compute') {
        current_service = 'compute';
        current_region = _.isUndefined(testrow.subregion) ? testrow.region : testrow.subregion;
        //tables
        testProgressComponent.set(current_service + '.' + current_region + '.' + testtype + '.progress', progress.progress);
        testProgressComponent.set('current_svc', 'compute');
        testProgressComponent.set('current_reg', current_region);



    }
    if (testrow.service_type == 'storage') {
        current_service = 'storage';
        current_region = _.isUndefined(testrow.subregion) ? testrow.region : testrow.subregion;
        testProgressComponent.set(current_service + '.' + current_region + '.' + testtype + '.progress', progress.progress);
        testProgressComponent.set('current_svc', 'storage');
        testProgressComponent.set('current_reg', current_region);
    }
    if (testrow.service_type == 'cdn') {
        current_service = 'cdn';
        current_region = 'noregion';
        testProgressComponent.set(current_service + '.' + testtype + '.progress', progress.progress);
        testProgressComponent.set('current_svc', 'cdn');
        testProgressComponent.set('current_reg', 'noregion');




    }
    currProgressComponent.set('progressdata.currentregion', current_region);
    //eg dns compute storage or cdn
    currProgressComponent.set('progressdata.current_service', current_service);





}

function resultsUpdate(testNum, results) {
    var testrow = gb_test_list[testNum];
    var current_region = _.isUndefined(testrow.subregion) ? testrow.region : testrow.subregion;


    currProgressComponent.set('progressdata.total_tests_completed', currProgressComponent.get('progressdata.total_tests_completed') + 1);
    var subtest = '';

    if (testrow.type == 'dns') {
        subtest = 'dns';
        currProgressComponent.set('progressdata.dns_tests_completed', currProgressComponent.get('progressdata.dns_tests_completed') + 1);
    }
    if (testrow.type == 'downlink') {

        if (testrow.concurrency == 2) {
            subtest = 'downlink2';
        } else {
            subtest = 'downlink4';
        }
        currProgressComponent.set('progressdata.downlink_tests_completed', currProgressComponent.get('progressdata.downlink_tests_completed') + 1);
    }
    if (testrow.type == 'latency') {
        subtest = 'latency';
        currProgressComponent.set('progressdata.latency_tests_completed', currProgressComponent.get('progressdata.latency_tests_completed') + 1);
    }




    if (testrow.service_type == 'compute') {
        testProgressComponent.set('compute.' + current_region + '.' + subtest + '.fastest', results.fastest);
        testProgressComponent.set('compute.' + current_region + '.' + subtest + '.slowest', results.slowest);
        testProgressComponent.set('compute.' + current_region + '.' + subtest + '.mean', results.mean);
        testProgressComponent.set('compute.' + current_region + '.' + subtest + '.median', results.median);
        testProgressComponent.set('compute.' + current_region + '.' + subtest + '.metric10', results.metric10);
        testProgressComponent.set('compute.' + current_region + '.' + subtest + '.metric25', results.metric25);
        testProgressComponent.set('compute.' + current_region + '.' + subtest + '.metric75', results.metric75);
        testProgressComponent.set('compute.' + current_region + '.' + subtest + '.metric90', results.metric90);
        testProgressComponent.set('compute.' + current_region + '.' + subtest + '.stdev', results.stdev);
        testProgressComponent.set('compute.' + current_region + '.' + subtest + '.status', results.status);
    }
    if (testrow.service_type == 'storage') {
        testProgressComponent.set('storage.' + current_region + '.' + subtest + '.fastest', results.fastest);
        testProgressComponent.set('storage.' + current_region + '.' + subtest + '.slowest', results.slowest);
        testProgressComponent.set('storage.' + current_region + '.' + subtest + '.mean', results.mean);
        testProgressComponent.set('storage.' + current_region + '.' + subtest + '.median', results.median);
        testProgressComponent.set('storage.' + current_region + '.' + subtest + '.metric10', results.metric10);
        testProgressComponent.set('storage.' + current_region + '.' + subtest + '.metric25', results.metric25);
        testProgressComponent.set('storage.' + current_region + '.' + subtest + '.metric75', results.metric75);
        testProgressComponent.set('storage.' + current_region + '.' + subtest + '.metric90', results.metric90);
        testProgressComponent.set('storage.' + current_region + '.' + subtest + '.stdev', results.stdev);
        testProgressComponent.set('storage.' + current_region + '.' + subtest + '.status', results.status);
    }
    if (testrow.service_type == 'cdn') {
        testProgressComponent.set('cdn.' + subtest + '.fastest', results.fastest);
        testProgressComponent.set('cdn.' + subtest + '.slowest', results.slowest);
        testProgressComponent.set('cdn.' + subtest + '.mean', results.mean);
        testProgressComponent.set('cdn.' + subtest + '.median', results.median);
        testProgressComponent.set('cdn.' + subtest + '.metric10', results.metric10);
        testProgressComponent.set('cdn.' + subtest + '.metric25', results.metric25);
        testProgressComponent.set('cdn.' + subtest + '.metric75', results.metric75);
        testProgressComponent.set('cdn.' + subtest + '.metric90', results.metric90);
        testProgressComponent.set('cdn.' + subtest + '.stdev', results.stdev);
        testProgressComponent.set('cdn.' + subtest + '.status', results.status);
    }
    if (testrow.service_type == 'dns') {
        testProgressComponent.set('dns.latency.fastest', results.fastest);
        testProgressComponent.set('dns.latency.slowest', results.slowest);
        testProgressComponent.set('dns.latency.mean', results.mean);
        testProgressComponent.set('dns.latency.status', results.status);
        testProgressComponent.set('dns.latency.median', results.median);
        testProgressComponent.set('dns.latency.metric10', results.metric10);
        testProgressComponent.set('dns.latency.metric25', results.metric25);
        testProgressComponent.set('dns.latency.metric75', results.metric75);
        testProgressComponent.set('dns.latency.metric90', results.metric90);
        testProgressComponent.set('dns.latency.stdev', results.stdev);
    }


    console.log(testNum + ' ' + gb_test_list.length);
}
function ch_st_loaded(speedtest) {
    var uplinkRedirectUri = "web/probe/up.html"; // change this to the URI where up.html is accessible on your server

    var mEvent = {
        currentTestNumber: 0,
        started: function (tests, types) {
            gb_test_list = tests;
            initStats();


        },
        progress: function (tests, progress) {
            //console.log(progress);
            updateProgress(this.currentTestNumber, progress);

        },
        results: function (tests, results) {
            //results

            //console.error(results);

            resultsUpdate(this.currentTestNumber, results)
            this.currentTestNumber += 1;

        },
        stopped: function (complete) {
            console.log("STOPPED CALLBACK: complete - " + complete);
        }
    };

    speedtest.start(mEvent, uplinkRedirectUri);
}