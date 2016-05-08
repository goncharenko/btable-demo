(function() {
  'use strict';

  angular.module('demo')
    .controller('DemoController', DemoController);

  //DemoController.$inject = [];

  function DemoController() {
    var vm = this;

    vm.testTableExt = {
      model: {
        data: null,
        events: {
          onPageChange: onPageChange,
          onSearch: onSearch,
          onSort: onSort
        },
        pager: {
          currentPage: 0,
          itemsPerPage: 2,
          pages: 0
        },
        searcher: {
          value: null
        },
        sorter: {
          predicate: null,
          reverse: false
        }
      }
    };

    vm.testTableInt = {
      model: {
        data: null,
        pager: {
          itemsPerPage: 5,
        },
      },
    };

    vm.testTableExpInt = {
      model: {
        data: null,
        pager: {
          itemsPerPage: 5,
        },
      },
    };

    vm.testTableWPInt = {
      model: {
        data: null
      },
    };

    function onPageChange() {
    }

    function onSearch() {
    }

    function onSort() {
    }

    activate();

    function activate() {
      console.debug('DemoController activated!');
      vm.testTableExt.model.data = generate();
      vm.testTableInt.model.data = generate();
      vm.testTableExpInt.model.data = generate();
      vm.testTableWPInt.model.data = generate();
    }

    function generate() {
      var result = [];
      for (var i = 0; i < 7; i++) {
        var fake = {
          firstName: chance.first(),
          lastName: chance.last(),
          birthday: chance.birthday(),
          age: chance.age(),
          gender: chance.gender(),
          lastLogin: chance.date()
        };
        result.push(fake);
      }
      return result;
    }
  }
})();
