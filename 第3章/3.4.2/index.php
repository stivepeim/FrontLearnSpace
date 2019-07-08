<?php
	include_once("lib/pdo.php");
	$times = $pdo->find("select time from user order by time desc");

?>
<html>
<head>
	<title>用户总数</title>
</head>
<body>
<div style="text-align:center;">
	开始时间：
	<select id="startTime">
		<?php foreach($times as $time):?>
			<option value="<?=$time['time']?>"><?=$time['time']?></option>
		<?endforeach?>
	</select>
	结束时间：
	<select id="endTime">
		<?php foreach($times as $time):?>
			<option value="<?=$time['time']?>"><?=$time['time']?></option>
		<?endforeach?>
	</select>
</div>
<div id="container" style="text-align:center;margin:0 auto;"></div>
<script src="js/seajs/sea.js" data-main="main" data-config="config"></script>
</body>
</html>