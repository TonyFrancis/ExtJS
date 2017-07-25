Ext.define('Test.view.file.FileUpload', {
	xtype: 'fileupload',
	extend: 'Ext.form.Panel',

	items: {
		xtype: 'form',
		reference: 'form',
		items: [
			{
				xtype: 'filefield',
				name: 'Excel',
				fieldLabel: 'Username',
				allowBlank: false,
        id: 'file-object',

				listeners: {
					afterrender: function(cmp) {
						cmp.fileInputEl.set({
							accept: '.xlsx,.xls,.XLS,.X' // or w/e type
						});
					},
					change: function(el, value) {
						console.log(el.fileInputEl, value, 'hello worl');
					}
				}
			}
		],
		buttons: [
			{
				text: 'Upload',
				handler: function(sender) {
					var form = this.up('form');
					var file = form.down('filefield').getEl().down('input[type=file]').dom
						.files[0];
					var reader = new FileReader();
					reader.onload = (function(theFile) {
						return function(fileHandle) {
              var fileURILocation = fileHandle.target.result;
							var fileHeader = fileURILocation.substr(0, fileURILocation.indexOf(","));
              var fileData = fileURILocation.substr(fileURILocation.indexOf(","));
              var fileType = fileHeader.match(/;base64/) ? "base64" : "binary";
              excelFile.open(fileData, {type:fileType});
              excelFile.saveAs(
                'testse.xlsx'
              )
						};
					})(file);
					var excelFile = new ExcelPlus();
          reader.readAsDataURL(file);
          // ep.openLocal({
          //     idButton: 'file-object-button-fileInputEl'
          // });
          // console.log(ep);
          // ep.saveA('test')
					// We're going to do several tasks in one line of code:
					// 1) create an Excel with one sheet called "Book1"
					// 2) write some data from an array to the new-created sheet
					// 3) create a new sheet called "Book2"
					// 4) write "A1" in cell "A1" of the new-created sheet
					// 5) write the today date in D1 of the "Book1" sheet
					// 6) save it on the user computer (this last step only works with IE10+ and modern browsers)
          // ep.openRemote('C:\fake')
				}
			}
		]
	}
});
