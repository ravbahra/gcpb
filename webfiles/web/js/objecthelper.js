function progressObject(region) {
    this.region = region;
    this.latency = {
        fastest: 0,
        slowest: 0,
        mean: 0,
        median: 0,
        metric10: 0,
        metric25: 0,
        metric75: 0,
        metric90: 0,
        stdev: 0,
        progress: 0,
        status:'queued'
    };
    this.downlink2 = {
        fastest: 0,
        slowest: 0,
        mean: 0,
        median: 0,
        metric10: 0,
        metric25: 0,
        metric75: 0,
        metric90: 0,
        stdev: 0,
        progress: 0,
        status:'queued'
        
    };
    this.downlink4 = {
        fastest: 0,
        slowest: 0,
        mean: 0,
        median: 0,
        metric10: 0,
        metric25: 0,
        metric75: 0,
        metric90: 0,
        stdev: 0,
        progress: 0,
        status:'queued'
        
    };
}

function createTableObject(service, masterTable) {
    var filteredTable = _.filter(masterTable, function(ch_tbl_row) {
        return ch_tbl_row.service_type == service;
    });
    var uniqueregions = _.uniq(_.map(filteredTable, function(ch_tbl_row) {
        return _.isUndefined(ch_tbl_row.subregion) ? ch_tbl_row.region : ch_tbl_row.subregion;
    }));
    var newTableObject = _.object(uniqueregions, _.map(uniqueregions, function(unique_country) {
        return new progressObject(unique_country)
    }));
    
    return newTableObject;
}
