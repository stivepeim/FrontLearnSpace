<?php
date_default_timezone_set('Asia/Shanghai');
function dbg($d){
	echo '<pre>';
	print_r($d);
}

function _g($name, $default = ''){
	return isset($_GET[$name]) ? $_GET[$name] : $default;
}
function _p($name , $default = ''){
	return isset($_POST[$name]) ? $_POST[$name] : $default;
}
class LUDB{
	private $db;
	function __construct(){
		$dsn = $dsn ? $dsn : 'mysql:dbname=user_growth;host=127.0.0.1;port=3306';
		try {
			$this->db = new PDO($dsn, 'root', 'root');
			$this->db->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );
			$this->db->exec("SET NAMES 'UTF8'");
		} catch (PDOException $e) {
			dbg('Connection failed: ' . $e->getMessage());
			exit;
		}
	}
	
	public function insert($table, $data){
		$keys = array_keys($data);
		$values = array_values($data);
		$a = $b = $c = array();
		foreach($keys as $k){
			array_push($a, '`' . $k . '`');
			array_push($c, '?');

		}
		$key = implode(',', $a);
		
		$_c = implode(',', $c);
		
		$sql = "insert into `$table` ($key) values ($_c);";
		$sth = $this->db->prepare($sql);

		$sth->execute($values);

		return $this->db->lastInsertId();

	}
	public function _insert($sql){
		if($this->db->exec($sql)){
			return $this->db->lastInsertId();
		}else{
			return FALSE;
		}
	}
	
	public function query($sql){
		$rs = $this->db->query($sql);
		$rs->setFetchMode(PDO::FETCH_ASSOC);
		return $rs->fetchAll();
	}

	public function find($sql){
/* 		dbg($sql); */
		$rs = $this->db->query($sql);
		$rs->setFetchMode(PDO::FETCH_ASSOC);
		return $rs->fetchAll();

	}
	public function find_id($sql){
		$rs = $this->db->query($sql);
		$rs->setFetchMode(PDO::FETCH_ASSOC);
		$tmp = $rs->fetchAll();
		$tmps = array();
		if($tmp){
			foreach($tmp as $k => $t){
				$tmp_t = array_values($t);
				$tmps[$tmp_t[0]] = $t;
			}
		}
		return $tmps;
	}

	public function get($sql){
		$rs = $this->db->query($sql);
		$rs->setFetchMode(PDO::FETCH_ASSOC);
		return $rs->fetch();
	}
	public function update($table, $data, $where){
		$sql = "update $table set ";
		$a = array();
		$values = array_values($data);
		foreach($data as $k=>$d){
			array_push($a, '`' . $k . '` = ?');
		}
		$sql .= implode(',', $a);
		if($where){
			$sql .= ' ' . $where;
		}
		$sth = $this->db->prepare($sql);
        return $sth->execute($values);
	}
	public function _update($sql){
		return ($this->db->exec($sql) > 0);
	}

	public function delete($sql){
		return ($this->db->exec($sql) > 0);
	}

	public function count($table,$where = false){
		$sql = "SELECT count(*) FROM `$table`";
		if($where){
			$sql .= " WHERE " . $where;
		}
		$rs = $this->db->query($sql);
		$rs_num = $rs->fetch(PDO::FETCH_NUM);
		return $rs_num[0];
	}

}

$pdo = new LUDB();