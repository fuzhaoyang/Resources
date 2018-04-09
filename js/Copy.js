
//Éî¿½±´º¯Êý
 function ObjCopy(obj) {
 	var tmp_obj;
 	if (typeof obj == 'object') {
 		
 		if (obj instanceof Array) {
 			tmp_obj = [];
 		} else {
 			tmp_obj = {};
 		}
 	} else {
 		return obj;
 	}
 	for (var i in obj) {
 		if (typeof obj[i] != 'object') {
 			tmp_obj[i] = obj[i];
 		} else if (obj[i] instanceof Array) {
 			tmp_obj[i] = [];
 			for (var j in obj[i]) {
 				if (typeof obj[i][j] != 'object') {
 					tmp_obj[i][j] = obj[i][j];
 				} else {
 					tmp_obj[i][j] = ObjCopy(obj[i][j]);
 				}
 			}
 		} else {
 			tmp_obj[i] = ObjCopy(obj[i]);
 		}
 	}
 	return tmp_obj;
 }
