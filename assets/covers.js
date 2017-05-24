/**
 * Created by levi.kim on 24/05/2017.
 */
var q = $( ".renderCovers" ).parents();
for( var i=0; i < q.length; i++) {
    var ClassLists = q[i].classList;
    for (var j = 0; j < ClassLists.length; j++) {
        if ( ClassLists[j] == 'vc_row' ) {
            q[6].className +=' simpleSquares-row';
        }
    }
}