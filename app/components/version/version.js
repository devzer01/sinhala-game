'use strict';

angular.module('com.github.devzer01.typeMaster.version', [
  'com.github.devzer01.typeMaster.version.interpolate-filter',
  'com.github.devzer01.typeMaster.version.version-directive'
])

.value('version', '0.1');
