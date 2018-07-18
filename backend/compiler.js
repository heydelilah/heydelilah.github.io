const fs = require("fs");



const result = {};

function readContentFromFile(filename, path){
	var content = fs.readFileSync(path, 'utf-8');

	var obj = {};

	const regex = /^---((\n|.)+?)---/;
	const info = content.match(regex);


	if(info && info.length){
		
		obj = getParams(info[1]);
		content = content.replace(regex, '');
	}

	obj.filename = filename;
	obj.content = content;
	obj.id = ID++;

	return obj;
}


var ID = 0;

function readListFromFolder(path){

	const dir = fs.readdirSync(path);
	for (var i = 0; i < dir.length; i++) {
		const type = dir[i];

		if(type == '.DS_Store'){continue;}
		const filename = fs.readdirSync(path + type+'/');

		result[type] = [];

		for (var ii = 0; ii < filename.length; ii++) {

			// todo: 去掉 DS_Store
			if(filename[ii] == '.DS_Store'){continue;}
			// console.log(filename[ii], result)
			var record = readContentFromFile(filename[ii], path+type+'/'+filename[ii])
			

			result[type].push(record);
		}
	};
}

function getParams (data) {
	var result1 = {};

	data = data.replace(/---/g, '');

	var array = data.split('\n');

	for (var i = 0; i < array.length; i++) {
		if(array[i]){
			var item = array[i].split(":");
			if(!item[1]){
				
				// console.log(data)
			}
			result1[item[0].trim()] = item[1].trim();
		}
	};

	return result1;
}

readListFromFolder('./articles/')

const output = './output/list.json';
fs.writeFile(output, JSON.stringify(result), (err)=>{
	if(err) throw err;
	console.log("done!");
})


