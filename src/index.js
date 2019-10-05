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
    /*проверка на скобочки*/

    while ((expr.indexOf('(') != -1) && (expr.lastIndexOf(')') != -1)) {
       let a, start, final ;
       start= expr.indexOf('(');
       final = expr.indexOf(')');
       if ((expr.slice(start+1, final).includes('(') !=-1) /*&& (expr.slice(start+1, final).includes(')') ==-1)*/) {
       	let openCount, closeCount;
       	openCount=0; 
       	closeCount = 0;
       	 expr.slice(start, final+1).forEach((item,index)=>{
       		if (item == '(') openCount++;
       		if (item == ')') closeCount++;
       		});
       	if (closeCount > openCount) throw "ExpressionError: Brackets must be paired";
       	if (closeCount < openCount){
       		
       		do {
       			final++;
       			if (expr[final] == '(') openCount++;
       			if (expr[final] == ')') closeCount++;
       			if ((openCount!=closeCount) && (final == expr.length-1)){
       				throw "ExpressionError: Brackets must be paired";
       			}
       	    		}
       		while (openCount != closeCount);
       	}
       
       }
       a = expressionCalculator(expr.slice(start+1, final));
       expr.splice (start, (final-start+1), a);
    }


    if (((expr.indexOf('(') != -1) && (expr.lastIndexOf(')') == -1)) || ((expr.indexOf('(') == -1) && (expr.lastIndexOf(')') != -1))) {
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
                if (Number(expr[i+1] <0)) {
                     expr.splice (i-1, 3, (Number(expr[i-1]) + (-1* Number(expr[i+1]))));
                }
                else expr.splice (i-1, 3, (Number(expr[i-1]) - Number(expr[i+1])));
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