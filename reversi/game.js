/* Reversie Game made in HTML/CSS/JS */
const table = document.getElementById("game-table"); // テーブル
const table_length = document.getElementById("game-table").rows[0].cells.length; //テーブルのサイズ
// 横、縦、斜めの確認に必要のある方向の計算し方
const directions = [
    [0, -1],
    [0, +1],
    [-1, 0],
    [+1, 0],
    [-1, -1],
    [+1, +1],
    [+1, -1],
    [-1, +1],
];

// プレイヤクラス
class Player {
    constructor(color) {
        this.color = color; //プレイヤの色
    }
    //プレイヤのボードにある全てのピース
    all_pieces = function all_pieces() {
        return document.querySelectorAll(`p.${this.color}`);
    };
}
const black = new Player("black"); //黒側
const white = new Player("white"); //白側

let current_player = black; //自分のプレイヤ
let opposite_player = white; //相手のプレイヤ

// プレイヤ交換の関数
const change_turns = () => {
    if (current_player == black) {
        current_player = white;
        opposite_player = black;
        document.querySelector("#white_score").style.visibility = "visible";
        document.querySelector("#black_score").style.visibility = "hidden";

        document.getElementById("switch").checked = true;
    } else {
        current_player = black;
        opposite_player = white;
        document.getElementById("switch").checked = false;
        document.querySelector("#white_score").style.visibility = "hidden";
        // document.querySelector("#white_score > span").textContent = document.querySelectorAll("p.ok").length
        document.querySelector("#black_score").style.visibility = "visible";
    }
};

//ボードの場所
class Point {
    constructor(row, col) {
        this.row = row; // 縦
        this.col = col; // 横
    }
}
let point = new Point(undefined, undefined); // Pointのオブジェクト　まだ場所不明でundefined
// current_player(自分)の横、縦、斜めに置けれる場所を探す関数
const check = (row, col, direction) => {
    /* // console.log("check() for possible mves"); */
    row_change = direction[0];
    col_change = direction[1];
    /* console.log(`checking (${row}, ${col} for ${row + row_change}, ${col + col_change})`); */
    has_opposite = false; // 相手があるかどうか
    let i, j;
    for (
        i = row + row_change, j = col + col_change;
        i < table_length && j < table_length && i >= 0 && j >= 0;
        i += row_change, j += col_change
    ) {
        let piece = table.rows[i].cells[j];
        /* // console.log(piece); */
        if (piece.classList.contains(opposite_player.color)) {
            //もしpieceは相手の石だったら
            /* // console.log(`opposite ${opposite_player.color} player found at ${row}, ${i}`); */
            has_opposite = true;
            continue;
        } else if (piece.classList.contains("empty")) {
            //何もなかった場合
            /* // console.log(`empty player found at (${piece.parentNode.rowIndex},${piece.cellIndex})`); */
            if (has_opposite) {
                // 前、相手があった場合、
                piece.appendChild(document.createElement("p")); // 空いていることを表示するピース(p.ok)を入れる
                piece.children[0].className = "ok";
                piece.className = "ok";
                piece.addEventListener("click", piece_clicked, { once: true });
                /* // console.log(`(${piece.parentNode.rowIndex},${piece.cellIndex}) is OK`); */
                return;
            }
            return;
        } else {
            return;
        }
    }
};

const show_moves = () => {
    document.querySelectorAll("p.ok").forEach(element => {
        element.classList.add("show_moves");
    });
    document.querySelector("#show_moves > i").classList.remove("fa-eye-slash");
    document.querySelector("#show_moves > i").classList.add("fa-eye");
};

// 上のcheck()を自分の全部のピースで、横、縦、斜めで確認する関数
const possible_moves = () => {
    /* // console.log("possible_moves()"); */
    current_player.all_pieces().forEach(element => {
        element.parentNode.className = current_player.color;
        row = element.parentNode.parentNode.rowIndex;
        cell = element.parentNode.cellIndex;
        directions.forEach(direction => {
            check(row, cell, direction);
        });
    });
    document.querySelector("#black_score > span").textContent = document.querySelectorAll("p.black").length;
    document.querySelector("#white_score > span").textContent = document.querySelectorAll("p.white").length;
};

// check()が入れたp.okを消していく・リセットする関数
const possible_moves_reset = () => {
    /* // console.log("possible_moves_reset()"); */
    const ok_pieces = document.querySelectorAll("td.ok");
    ok_pieces.forEach(element => {
        element.className = "empty";
        element.removeChild(element.children[0]);
        element.removeEventListener("click", piece_clicked);
    });
};

// 相手のピースをひっくり返す関数
const outflank = (row, col, direction) => {
    /* // console.log("outflank()"); */
    has_opposite = false;
    row_change = direction[0];
    col_change = direction[1];
    let i, j, q, w;
    for (
        i = row + row_change, j = col + col_change;
        i >= 0 && j >= 0 && i < 8 && j < 8;
        i += row_change, j += col_change
    ) {
        let piece = table.rows[i].cells[j];
        if (piece.className == opposite_player.color) {
            /* // console.log("has opposite : "); */
            /* // console.log(piece); */
            has_opposite = true;
            continue;
        } else if (piece.className == current_player.color) {
            if (has_opposite) {
                /* // console.log(`piece opposite changing`, point.row, point.col); */
                // for (q = point.row + row_change, w = point.col + col_change; q != i || w != j; q += row_change, w += col_change) {
                for (q = point.row, w = point.col; q != i || w != j; q += row_change, w += col_change) {
                    table.rows[q].cells[w].className = current_player.color;
                    table.rows[q].cells[w].children[0].className = current_player.color;
                    /* // console.log("piece changed"); */
                    /* // console.log(table.rows[q].cells[w]); */
                }
            }
            return;
        }
        return;
    }
};

let go_ahead = false; // 関数の全部一気に実行させないために使おうとしています
function piece_clicked(e) {
    /* // console.log(e); */
    if (e.path[0].childElementCount == 0) {
        point.row = e.path[2].rowIndex;
        point.col = e.path[1].cellIndex;
        /* console.log(`${point.row}, ${point.col} clicked`); */
    } else {
        point.row = e.path[1].rowIndex;
        point.col = e.path[0].cellIndex;
        /* console.log(`${point.row}, ${point.col} clicked`); */
    }

    //outflank
    directions.forEach(direction => {
        outflank(point.row, point.col, direction);
    });
    possible_moves_reset();
    change_turns();
    possible_moves();
    is_over();
}

const is_over = () => {
    if (document.querySelectorAll("td.ok").length <= 0) {
        document.querySelector("#black-score").innerHTML = document.querySelectorAll("td.black").length;
        document.querySelector("#white-score").innerHTML = document.querySelectorAll("td.white").length;
        if (current_player.all_pieces().length > opposite_player.all_pieces().length) {
            document.querySelector("#winner").textContent = current_player.color.toUpperCase();
        } else if (current_player.all_pieces().length < opposite_player.all_pieces().length) {
            document.querySelector("#winner").textContent = opposite_player.color.toUpperCase();
        } else if (current_player.all_pieces().length == opposite_player.all_pieces().length) {
            document.querySelector("#winner").textContent = "DRAW!";
            document.querySelector("body > div.modal > div > div.message > p").remove();
        }
        document.querySelector(".modal").classList.toggle("show-modal");
    } else {
        return false;
    }
};
document.querySelector("#clear-modal").addEventListener("click", () => {
    document.querySelector(".modal").classList.toggle("show-modal");
});

const start = () => {
    possible_moves();
    document.querySelector("#start_btn").remove();
    document.querySelector("#reset_btn").style.display = "inline-block";
};

window.onload = () => start();

const game_reset = () => {
    // todo gotta make game reset button
};
