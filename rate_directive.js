
(function() {
  'use strict';

  angular
    .module('app', [])
    .controller('RatingController', RatingController)
    .directive('starRating', starRating);

  function RatingController() {
    this.rating1 = 5;
    this.isReadonly = false;
    this.rateFunction = function(rating) {
      console.log('Rating selected: ' + rating);
    };
  }

  function starRating() {
    return {
      restrict: 'EA',
      template:
        '<p class="titleRating">Deja tu Valoración</p>' +
        '<ul class="star-rating" ng-class="{readonly: readonly}">' +
        '  <li ng-repeat="star in stars" class="star" ng-class="{filled: star.filled}" ng-click="toggle($index)">' +
        '    <i class="fa fa-star"></i>' + 
        '  </li>' +
        '</ul>' + 
        '<div class="row">' +
        '    <p class="titleRating">Deja tu Comentario</p>' +
        '    <textarea class="form-control" id="rating_text" rows="3" placeholder="Escribe aquí tu comentario"></textarea>' +
        '</div>' + 
        '<br>' +
        '<div class="row">' +
        '    <button type="button" class="btn btn-danger button_send_comment" ng-click="send_rate(scope.rating)">Enviar</button>' + 
        '</div>',
      scope: {
        ratingValue: '=ngModel',
        max: '=?', 
        onRatingSelect: '&?',
        readonly: '=?'
      },
      link: function(scope, element, attributes) {
        if (scope.max == undefined) {
          scope.max = 5;
        }
        function updateStars() {
          scope.stars = [];
          for (var i = 0; i < scope.max; i++) {
            scope.stars.push({
              filled: i < scope.ratingValue
            });
          }
        };
        scope.toggle = function(index) {
          if (scope.readonly == undefined || scope.readonly === false){
            scope.ratingValue = index + 1;
            scope.onRatingSelect({
              rating: index + 1
            });
          }
        };
        scope.$watch('ratingValue', function(oldValue, newValue) {
          if (newValue) {
            updateStars();
          }
        });
        scope.send_rate = function (rating) {
          scope.ratingValue
          var textRating = document.getElementById("rating_text").value
          var dataComment = {
            'rating': scope.ratingValue,
            'textRating': textRating
          }
         
        }
      }
    };
  }
})();
