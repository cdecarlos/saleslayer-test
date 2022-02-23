<?php
include_once 'config.php';

/**
 * Database class
 *
 * @author Carlos M <cmarti@pentec.es>
 */
class DB {
  private $db_con = null;

  public static function init() {
    $mysql = new mysqli(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DATABASE);

    if (mysqli_connect_errno()) {
      printf("Falló la conexión failed: %s\n", $mysqli->connect_error);
      exit();
    }

    return $mysql;
  }

  /**
   * Select SQL
   *
   * @param string $from
   * @param string $order
   * @param string $where
   * @param string $select
   * @param integer $limit
   * @return array
   * @author Carlos M <cmarti@pentec.es>
   */
  public static function select ($from, $order, $where = '', $select = '*', $limit = 1000) {
    $mysql = self::init();

    // Compose where
    if ($where != '') $where = ' WHERE ' . $where;

    // Compose query
    $query = 'SELECT ' . $select . ' FROM ' . $from . $where . ' ORDER BY ' . $order . ' LIMIT ' . $limit;

    $result = $mysql->query($query);

    $res = [];
    while($row = $result->fetch_assoc()) {
      $res[]= $row;
    }
    if (count($res) == 1) return $res[0];

    $mysql->close();

    return $res;
  }

  /**
   * Insert on db
   *
   * @param string $table
   * @param array $data
   * @return any
   * @author Carlos M <cmarti@pentec.es>
   */
  public static function insert ($table, $data) {
    $mysql = self::init();

    $index = [];
    $values = [];
    foreach ($data as $i => $val) {
      $index[]= "`" . $i . "`";
      $values[]= "'" . $val . "'";
    }

    $sql = 'INSERT INTO ' . $table . ' (' . implode (', ', $index) . ') VALUES (' . implode (', ', $values) . ')';

    $result = $mysql->query($sql);

    $mysql->close();

    return $result;
  }
}
