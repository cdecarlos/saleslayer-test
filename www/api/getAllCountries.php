<?php
include './lib/CountryModel.php';

// Get all countries
$country = CountryModel::getAll();

$res = [];
foreach ($country as $country) {
  $res[]= $country['data'];
}

// Response json
header('Content-Type: application/json; charset=utf-8');
echo json_encode($res);
die;
