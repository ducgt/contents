--1. 이름에 F가 들어가는 직원의 근무지 검색하기
select loc
from emp e, dept d
where e.deptno = d.deptno
and ename like '%F%';
--2. 급여(sal)의 등급(grade)가 1인 사람들의 직급(job)을 중복 없이 표현하라
select distinct job
from emp, salgrade
where grade = 1 and sal between losal and hisal;
--3. 직급(job)이 'SALESMAN'인 사원의 매니저의 고용일(hiredate)를 중복 없이 출력하라
select distinct m.hiredate
from emp s, emp m
where s.job='SALESMAN'
and s.mgr = m.empno;
--4. 모든 고용인들의 상사 관계를 출력하라
select e.ename 사원명, m.ename 상사, m2.ename "상사 상사",
m3.ename "상사 상사 상사"
from emp e, emp m, emp m2, emp m3
where e.mgr = m.empno(+) and m.mgr = m2.empno(+) and m2.mgr = m3.empno(+)
order by m2.mgr asc, m.mgr asc, e.mgr asc;
--5. 가장 낮은 급여를 받는 사람이 속한 부서의 급여의 표준편차를 출력하라. (표준편차 함수 : stddev)
select round(stddev(sal), 0)
from emp, dept
where emp.deptno = dept.deptno
and sal in (select min(sal)
            from emp
            group by deptno
            );