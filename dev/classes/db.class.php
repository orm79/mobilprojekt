<?php
/**
 * Creates a new PDO instance representing a database connection
 * Contains methods to manipulate a database
 *
 * @author    Daniel Olsson <orol1600@student.miun.se>
 */
class DB {
    private static $db_instance = null;
    private $pdo;
    private $stmt;


    /**
     * DB Constructor sets up connection using PDO
     *
     */
    private function __construct() {
        // PDO connection variables
        $host    = DBHOST;
        $db      = DBDATABASE;
        $user    = DBUSER;
        $pass    = DBPASS;
        $charset = "utf8";

        $dsn = "mysql:host=$host;dbname=$db;charset=$charset";
        // PDO options for error mode, default fetch mode and prepare statement eumulation
        $opt = [
            PDO::ATTR_ERRMODE               => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE    => PDO::FETCH_ASSOC,
            PDO:: ATTR_EMULATE_PREPARES     => false,
        ];

        // try - catch block for error handling
        try {
            // new PDO connection with set parameters
            $this -> pdo = new PDO($dsn, $user, $pass, $opt);
            } catch(PDOException $e) {
                  die($e -> getMessage());
            }
    }


    /**
     * Get instance of DB if set, else create new DB instance and return it
     * Since the function is static it can be called via DB::getInstance(), without instantiation
     *
     * @return object   PDO object
    */
    public static function getInstance() {
        if(!isset(self::$db_instance)) {
            self::$db_instance = new DB();
        }
        return self::$db_instance;
    }


    /**
    * Prepare query
    *
    * @param $query          The query to prepare
    * @return object|bool    PDOStatement object on success, bool false on fail
    */
    public function query($query) {
        $this -> stmt = $this -> pdo -> prepare($query);
        return $this -> stmt;
    }


    /**
    * Bind parameter after checking its datatype
    *
    * @param $param    The parameter placeholder
    * @param $value    The parameter value
    * @param $type     The parameter datatype
    * @return void
    */
    public function bind($param, $value, $type = null) {
        if(is_null($type)) {
            switch(true) {
                case is_int($value):
                    $type = PDO::PARAM_INT;
                    break;
                case is_bool($value):
                    $type = PDO::PARAM_BOOL;
                    break;
                case is_null($value):
                    $type = PDO::PARAM_NULL;
                    break;
                default:
                    $type = PDO::PARAM_STR;
            } 
        }
        $this -> stmt -> bindValue($param, $value, $type);
    }


    /**
    * Execute the prepared statement
    *
    * @return bool  True or False
    */
    public function execute() { 
        return $this -> stmt -> execute();
    }

    
    /**
    * Returns resultset as associative array
    *
    * @return array   Results as associative array
    */
    public function result_set() {
        $this -> execute();
        return $this -> stmt -> fetchAll();
    }


    /**
    * Returns single result as associative array
    *
    * @return array   Result as associative array
    */
    public function result() {
        $this -> execute();
        return $this -> stmt -> fetch();
    }


    /**
    * Returns number of rows modified from last delete/update/insert
    *
    * @return int   Number of rows modified
    */
    public function rowCount() {
        return $this->stmt->rowCount();
    }    
}