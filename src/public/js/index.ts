// jquery
import $  = require('jquery');

// bootstrap
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css';
import 'datatables.net-bs4/css/dataTables.bootstrap4.css';

// datatables
declare function require(x: string): any
var dt = require('datatables.net')()
import 'datatables.net-bs4'
import 'datatables/media/css/jquery.dataTables.css'

// font-awesome Regular・Brandsライブラリを使用する場合、onloadでライブラリを追加
import fontawesome from '@fortawesome/fontawesome'
import faSolid from '@fortawesome/fontawesome-free-solid'
//import faRegular from '@fortawesome/fontawesome-free-regular'
//import faBrands from '@fortawesome/fontawesome-free-brands'

import {requestSync} from './lib/XmlHttpRequestSync'
import '../css/style.css';
import '../css/navbar-top-fixed.css';

window.onload = () => {
    // font-awesomeの設定
    fontawesome.library.add(faSolid)    // ライブラリの設定
    fontawesome.dom.css() 

    // DataTablesの言語設定
    $.extend($.fn.dataTable.defaults, {
        language: {
            url: "http://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Japanese.json"
        }
    });

    document.getElementById("tableBody").innerText = "";
    $("#tickets").DataTable({
        // 件数切替機能
        lengthChange: false,
        // 検索機能
        searching: true,
        // 情報表示 無効
        info: false,
        // ページング機能
        paging: false,
        columns: [
            { data: "id" },
            { data: "status" },
            { data: "start_date" },
            { data: "subject" }
        ],
        "order": [[1, "desc"]]
    });
    $('#tickets').DataTable().clear().draw();
    showDataTablesSync();
}

/**
 * テーブルに値を表示する
 */
var showDataTablesSync = async () => {
    // 値をjsonで取得
    var errorData;
    var datas = await requestSync("./datas.json", true).catch(e => errorData = e);
    if (errorData) {
        console.error(errorData);
        return;
    }

    $("#update").text = datas.updateDate ? "未取得" : datas.updateDate;
    $('#tickets').DataTable().clear().draw();
    for (let i = 0; i < datas.length; i++) {
        $('#tickets').DataTable().row.add(datas[i]).draw();

    }
}

/** 
 * アラートメッセージを表示する
 * @param {string} message メッセージ 
 * @param {boolean} isError trueの場合、エラーアラートを表示する
 */
var showMessage = (message:string, isError:boolean) => {
    var e = document.getElementById("message");
    e.classList.remove("alert-danger");
    e.classList.remove("alert-info");
    e.classList.add(isError ? "alert-danger" : "alert-info");
    document.getElementById("messageText").innerText = message;
    $("#message").fadeIn();
}

/**
 * アラートメッセージを閉じる
 */
var closeMessage = () => {
    var e = document.getElementById("message");
    e.classList.remove("alert-danger");
    e.classList.remove("alert-info");
    document.getElementById("messageText").innerText = "";
    $("#message").fadeOut();
}
