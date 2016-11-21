// add functionality to the clear button
$('#clearBtn').click(function() {
	$('#container').empty()
	$('#detail').empty()
});
// add functionality to the separator button
$('#separatorBtn').click(function() {
	renderSeparator()
});
// add functionality to the copy raw request button
$('#copyRequestRaw').click(function() {
	 window.prompt("Request should be preselected: Ctrl+C, Enter",$('.selected .tagRequest').html())
});
// add functionality to the copy  request button
$('#copyRequestParams').click(function() {
	var copyText = "Key\tName\tValue\n"
	$('.selected .tagParam').each(function(){
		copyText += $(this).find('.tagParamKey').html() + "\t" 
		copyText += $(this).find('.tagParamName').html() +  "\t"
		copyText += $(this).find('.tagParamValue').html() + "\n"
	})
	 window.prompt("Request should be preselected: Ctrl+C, Enter",copyText)
});

 $('#typeAnalytics, #typeLead,#typeTesting,#typeRemarketing').change(function() {
	if($(this).is(":checked")) {
		$('[data-type="' +  $(this).attr('name') + '"]').show();
	}else{
		$('[data-type="' +  $(this).attr('name') + '"]').hide();
	}     
	selectTagContainer($('.tagContainer:visible').eq(0))
});
 // handle arrow keys
 //needs more works its funky with hidden items
 $(document).keydown(function(e) {
 	
    switch(e.which) {
        case 38: // up
        if ($('.tagContainer.selected').index() == $('.tagContainer').length){
        	selectTagContainer($('.tagContainer').eq($('.tagContainer').length)-2)
        	break;
        }
        selectTagContainer($('.tagContainer').eq($('.tagContainer.selected').index() -1));
        break;

        case 83: //s
			renderSeparator();
        break;

        case 40: // down
        selectTagContainer($('.tagContainer').eq($('.tagContainer.selected').index() +1));
        break;

        default: return; 
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
});