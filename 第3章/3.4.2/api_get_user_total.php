<?php
include_once("lib/pdo.php");

/**
 * 设置虚拟数据
 *
 */
/* set_virtual_data(); */
function set_virtual_data(){
	global $pdo;
	for($i =0; $i<100; $i++){
		$rand_num = rand(5,95);
		$data = array(
			'time'=>date('Y-m-d', strtotime('- ' . $i . 'days')),
			'total'=>$rand_num
		);
		$pdo->insert('user', $data);
	}
}

function get_user_total($startTime, $endTime){
	global $pdo;
	if(!$startTime || !$endTime ){
		$user = $pdo->find("select * from user order by time desc limit 10");
		$user = array_reverse($user);
	}else{
		$user = $pdo->find("select * from user where time >= '$startTime' and time <= '$endTime'");
		$user = array_reverse($user);
	}
	foreach($user as $key => $u){
		$user[$key]['time'] = date('m-d', strtotime($u['time']));
	}
	echo json_encode($user);
}

$startTime = _p('startTime', '');
$endTime = _p('endTime', '');

get_user_total($startTime, $endTime);
