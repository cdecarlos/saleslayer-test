<?php
include './lib/CountryModel.php';

if (!isset ($_GET['name'])) {
  echo 'Missing name';
  die;
}

// Get one from db
$country = CountryModel::getOne($_GET['name']);

// Response json
header('Content-Type: application/json; charset=utf-8');
echo $country['data'];
die;
