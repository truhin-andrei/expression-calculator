function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    if( typeof expr == "string"){
    expr = expr.trim();
    expr = expr.split(" ");
    expr.forEach ((item, index, expr) => {
        if (item == ""){
            expr.splice (index, 1);
        }
        if (item.length > 1 ){
        if (item.includes('(')){
            if (item.length==2){
                expr.splice (index, 1,  '(', item.split('(')[1]);
            }
            expr.splice (index, 1,  '(','(', item.split('(')[2]);
        }
        if (item.includes(')')){
            if (item.length==2){
                expr.splice (index, 1, item.split(')')[0], ')');
            }
            expr.splice (index, 1, item.split(')')[0], ')',')');
        }
        if (item.includes('-')){
            let arr = item.split('(');
            expr.splice (index, 1, item.split('-')[0], '-', item.split('-')[1]);
           }
        if (item.includes('+')){
            expr.splice (index, 1, item.split('+')[0], '+', item.split('+')[1]);
        }
        if (item.includes('*')){
            expr.splice (index, 1, item.split('*')[0], '*', item.split('*')[1]);
        }
        if (item.includes('/')){
            expr.splice (index, 1, item.split('/')[0], '/', item.split('/')[1]);
        }
       
    }
    });
    }
    if ((expr.indexOf('(') != -1) && (expr.lastIndexOf(')') != -1)) {
       let a ;
       a = expressionCalculator(expr.slice(expr.indexOf('(')+1, expr.lastIndexOf(')')));
       expr.splice (expr.indexOf('('), (expr.lastIndexOf(')')-expr.indexOf('(')+1), a);
    }
    if (((expr.indexOf('(') != -1) && (expr.indexOf(')') == -1)) || ((expr.indexOf('(') == -1) && (expr.indexOf(')') != -1))) {
        throw "ExpressionError: Brackets must be paired";
    }
    if ((expr.indexOf('(') == -1) && (expr.lastIndexOf(')') == -1)){
        for (let i=0; i<expr.length; i++) {
            if (expr[i] == '/') {
                if (expr[i+1] == 0) throw "TypeError: Division by zero.";
                expr.splice (i-1, 3, (Number(expr[i-1]) / Number(expr[i+1])));
                i--;
            }
        }

        for (let i=0; i<expr.length; i++) {
            if (expr[i] == '*') {
                expr.splice (i-1, 3, (Number(expr[i-1]) * Number(expr[i+1])));
                i--;
            }
        }

        for (let i=0; i<expr.length; i++) {
            if (expr[i] == '-') {
                expr.splice (i-1, 3, (Number(expr[i-1]) - Number(expr[i+1])));
                i--;
            }
        }

        for (let i=0; i<expr.length; i++) {
            if (expr[i] == '+') {
                expr.splice (i-1, 3, (Number(expr[i-1]) + Number(expr[i+1])));
                i--;
            }
        }

        return Number(expr[0]);

    }
}

module.exports = {
    expressionCalculator
}