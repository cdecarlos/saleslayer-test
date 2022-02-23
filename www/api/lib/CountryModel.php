<?php
include_once 'db.php';

/**
 * Country Model class
 *
 * @author Carlos M <cmarti@pentec.es>
 */
class CountryModel {
  private $name;
  private $data;

  private $isNew = true;

  /**
   * Create model
   *
   * @param string $name
   * @param json $data
   * @return void
   * @author Carlos M <cmarti@pentec.es>
   */
  public static function createModel ($name, $data) {
    $country = new self;
    $country->name = $name;
    $country->data = $data;

    return $country;
  }

  /**
   * Get one from db
   *
   * @param string $name
   * @return array
   * @author Carlos M <cmarti@pentec.es>
   */
  public static function getOne ($name) {
    $country = DB::select('Country', 'name ASC', 'name LIKE "' . $name . '"', 'data', 1);

    $country['data'] = base64_decode($country['data']);

    return $country;
  }

  /**
   * Get all from db
   *
   * @return array
   * @author Carlos M <cmarti@pentec.es>
   */
  public static function getAll () {
    $country = DB::select('Country', 'name ASC', '', 'data', 1000);

    $country['data'] = base64_decode($country['data']);

    return $country;
  }

  /**
   * Insert on db
   *
   * @param string $name
   * @param string $data
   * @return void
   * @author Carlos M <cmarti@pentec.es>
   */
  public static function insert ($name, $data) {
    $data = base64_encode($data);
    $values = [
      'name' => $name,
      'data' => $data,
    ];
    DB::insert('Country', $values);
  }
}
