$('p:contains(\'{"state":\')').each(function (){
	const stateDetails = $(this).text()
 	const state = JSON.parse(stateDetails).state
  const title = JSON.parse(stateDetails).title
	const description = JSON.parse(stateDetails).description
  if(state === "red"){
		const errorClone = $('.is-error').clone();
  	errorClone.find('.component-heading').text(title);
  	errorClone.find('.component-desc').text(description);
    return $(this).replaceWith(errorClone[0]);
  }
  if(state === "green"){
		const successClone = $('.is-success').clone();
  	successClone.find('.component-heading').text(title);
  	successClone.find('.component-desc').text(description);
    return $(this).replaceWith(successClone[0]);
  }
  if(state === "grey"){
		const greyClone = $('.is-grey').clone();
  	greyClone.find('.component-heading').text(title);
  	greyClone.find('.component-desc').text(description);
    return $(this).replaceWith(greyClone[0]);
  }
  if(state === "blue"){
		const blueClone = $('.is-blue').clone();
    return $(this).replaceWith(blueClone[0]);
  }
})

const shareClone = $('.share-buttons').clone()
$('body').append('<div id="cDiv"> </div>')
function highlightText(e) {
	const elem = document.createElement('p');
	elem.innerText = 'Personal Details';
  let highlightNode = (document.all) ? document.getSelection() : document.getSelection();
  shareClone.addClass('clone')
  document.addEventListener('selectionchange', highlightText);
  if(!!window.getSelection().toString() && highlightNode.isCollapsed === false && !!(window.getSelection().toString().trim()).length ){
  	const copyText = highlightNode.toString();
    let encoded = encodeURIComponent(highlightNode.toString());
    let shareLink = encodeURIComponent(window.location.href);
    let fbShare = shareLink + '&description=' + encoded;
    let linkedinShare = `url=${shareLink}&title=${encoded}&summary=${encoded}&source=${shareLink}`
    const offset = window.pageXOffset || document.documentElement.scrollTop || document.body.scrollTop
    const parent = highlightNode.anchorNode.parentNode;
    const rect = highlightNode.getRangeAt(0).getBoundingClientRect();
    $('#cDiv').css('position','absolute');
    $('#cDiv').css('top',`calc(${rect.top + offset - 50}px)`);
    $('#cDiv').css('left',`calc(${rect.left}px + (calc(${rect.width}px / 2)) - 110px)`);
		$('#cDiv').append(shareClone);
    $('.share-buttons.clone').show()
    $('.facebook-share').click(() => {
    	window.open("https://www.facebook.com/sharer/sharer.php?u=" + fbShare);
    })
    $('.twitter-share').click(() => {
    	window.open(`https://twitter.com/intent/tweet?text=${encoded}&url=${shareLink}`)
    })
    $('.linkedin-share').click(() => {
    	window.open(`https://www.linkedin.com/shareArticle?mini=true&${linkedinShare}`)
    })
    $('.email-share').click(() => {
    	window.open(`mailto:''?subject=${window.location.href}&body=${encoded} on ${window.location.href}`);
    })
    $('.copy-share').click(() => {
    	navigator.clipboard.writeText(copyText)
    })
  } else {
  	document.removeEventListener('selectionchange', highlightText);
  	$('#cDiv').remove(shareClone);
  	$('.share-buttons.clone').hide()
  }
}
//if (!document.all) document.captureEvents(Event.MOUSEUP);
document.addEventListener('mouseup', highlightText);
document.addEventListener('keyup', highlightText);

$('p:contains(\'{"tabs":\')').each(function (){
	const tabDetails = $(this).text()
 	const tabs = JSON.parse(tabDetails).tabs
  let tabClone = $('.is-tabs.original').clone();
  tabClone = tabClone.removeClass('original');
  const keysArray = Object.keys(tabs)
	for(key in tabs){
  	const index = keysArray.indexOf(key)
    if(tabClone.find(`.tab-title:eq(${index})`).length !== 0 && index === 0){
      tabClone.find('.tab-title').text(key);
  		tabClone.find('.tab-desc').text(tabs[key]);
    } else {
      let titleClone = $('.blog-tab').clone();
  		let descClone = $('.blog-tabs_pane').clone();
    	titleClone = titleClone.eq(0).removeClass('w--current')
      titleClone.attr( "data-w-tab", `tab ${index+1}` );
      descClone = descClone.eq(0).removeClass('w--tab-active')
      descClone.attr( "data-w-tab", `tab ${index+1}` );
    	const appendedTitle = titleClone.appendTo(tabClone.find('.blog-tabs_menu'))
    	const appendedDesc = descClone.appendTo(tabClone.find('.blog-tabs_content'))
      appendedTitle.find('.tab-title').text(key);
  		appendedDesc.find('.tab-desc').text(tabs[key]);
    }
  }  
  return $(this).replaceWith(tabClone[0]);
})

$.expr[':'].textEquals = function(a, i, m) {  
    let textToFind = m[3].replace(/[-[\]{}(')*+?.[,\\^$|#\s]/g, '\\$&'); // escape special character for regex 
    return $(a).text().match("^" + textToFind + "$");
}; 
$('p:contains(\'{"cms":\')').each(function (){
	const cmsDetails = $(this).text()
  const title = JSON.parse(cmsDetails).itemid
	let recommendedClone = $('.is-recommended.original').clone();
  recommendedClone = recommendedClone.removeClass('original')
  const filter = recommendedClone.find(`.cms-recommended:has(.cms-heading:textEquals(${title}))`).toggleClass('showing');
  return $(this).replaceWith(recommendedClone[0]);
})

// horizontal click and drag the tab buttons
const slider = document.querySelector('.blog-tabs_menu');
let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener('mousedown', (e) => {
  isDown = true;
  slider.classList.add('active');
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});
slider.addEventListener('mouseleave', () => {
  isDown = false;
  slider.classList.remove('active');
});
slider.addEventListener('mouseup', () => {
  isDown = false;
  slider.classList.remove('active');
});
slider.addEventListener('mousemove', (e) => {
  if(!isDown) return;
  e.preventDefault();
  const x = e.pageX - slider.offsetLeft;
  const walk = (x - startX) * 3; //scroll-fast
  slider.scrollLeft = scrollLeft - walk;
  console.log(walk);
});
