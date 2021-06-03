import cloneDeep from "lodash/cloneDeep";
import utils from "svf-app-main/src/utils";

const getApiHost = () => {
    var reg = new RegExp(/http(s)?:\/\/(www.)?(\w+(\.)?)+/);
    if (!reg.test(process.env.VUE_APP_API_ROUTE_PREFIX)) {
        let url = _getDomainUrl() + process.env.VUE_APP_API_ROUTE_PREFIX;
        return url.replace(/\/*$/g, "");
    }
    return process.env.VUE_APP_API_ROUTE_PREFIX;
};

const _getDomainUrl = () => {
    return window.location.protocol + "//" + window.location.host;
};

function download(url, name) {
    const a = document.createElement("a");
    a.setAttribute("href", url);
    a.setAttribute("target", "_blank");
    if (name) {
        a.setAttribute("download", name);
    }
    a.download = name;
    document.body.appendChild(a);
    a.click();
}

function chainParams(params = {}) {
    let strArr = [];
    let str = "";
    for (let p in params) {
        params[p] && strArr.push(`${p}=${params[p]}`);
    }
    str += strArr.join("&");
    return (str && `?${str}`) || "";
}

async function downFetchCsv(url, data = {}, name = "export.csv") {
    const _data = cloneDeep(data);
    delete _data.pageSize;
    delete _data.pageNum;
    const reqUrl = getApiHost() + url + chainParams(_data);
    fetch(reqUrl, {
        method: "GET",
        headers: {
            "HB-CONSOLE-TOKEN": utils.getToken(),
            "Accept-Language": utils.getLang()
        }
    })
        .then(res => {
            return res.blob();
        })
        .then(blob => {
            const link = document.createElement("a");
            link.href = window.URL.createObjectURL(blob);
            link.download = name;
            link.click();
            window.URL.revokeObjectURL(link.href);
        });
}

export default {
    getApiHost,
    download,
    downFetchCsv
};
