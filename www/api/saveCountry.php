<?php
include './lib/CountryModel.php';

if (!isset ($_POST['name'])) {
  echo 'Missing name';
  die;
}
$name = $_POST['name'];

if (!isset ($_POST['data'])) {
  echo 'Missing data';
  die;
}
$data = $_POST['data'];

// Insert on db
$country = CountryModel::insert($name, $data);

// Response data inserted
header('Content-Type: application/json; charset=utf-8');
echo $data;
die;
