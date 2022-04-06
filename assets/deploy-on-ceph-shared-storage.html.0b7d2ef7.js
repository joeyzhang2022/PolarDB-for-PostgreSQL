import{e}from"./app.9be17b95.js";import{_ as n}from"./plugin-vue_export-helper.21dcd24c.js";const c={},o=e(`<h1 id="deploy-on-ceph-shared-storage" tabindex="-1"><a class="header-anchor" href="#deploy-on-ceph-shared-storage" aria-hidden="true">#</a> Deploy on Ceph Shared Storage</h1><div class="custom-container danger"><p class="custom-container-title">DANGER</p><p>Translation needed.</p></div><p>Ceph \u662F\u4E00\u4E2A\u7EDF\u4E00\u7684\u5206\u5E03\u5F0F\u5B58\u50A8\u7CFB\u7EDF\uFF0C\u7531\u4E8E\u5B83\u53EF\u4EE5\u63D0\u4F9B\u8F83\u597D\u7684\u6027\u80FD\u3001\u53EF\u9760\u6027\u548C\u53EF\u6269\u5C55\u6027\uFF0C\u88AB\u5E7F\u6CDB\u7684\u5E94\u7528\u5728\u5B58\u50A8\u9886\u57DF\u3002\u4EE5\u4E0B\u662F\u5728 ceph \u5206\u5E03\u5F0F\u96C6\u7FA4\u4E0A\u90E8\u7F72 PolarDB-FileSystem \u4EE5\u53CA PolarDB-for-PostgreSQL \u7684\u6559\u7A0B\u3002</p><p>ceph \u642D\u5EFA\u9700\u8981 2 \u53F0\u53CA\u4EE5\u4E0A\u7684\u7269\u7406\u673A/\u865A\u62DF\u673A\u5B9E\u73B0\u5B58\u50A8\u5171\u4EAB\u4E0E\u6570\u636E\u5907\u4EFD\uFF0C\u672C\u6559\u7A0B\u4EE5 3 \u53F0\u865A\u62DF\u673A\u673A\u73AF\u5883\u4E3A\u4F8B\uFF0C\u4ECB\u7ECD\u57FA\u4E8E ceph \u5171\u4EAB\u5B58\u50A8\u7684\u5B9E\u4F8B\u6784\u5EFA\u65B9\u6CD5\u3002\u5927\u4F53\u5982\u4E0B\uFF1A</p><ol><li>\u83B7\u53D6\u5728\u540C\u4E00\u7F51\u6BB5\u7684\u865A\u62DF\u673A\u4E09\u53F0\uFF0C\u4E92\u76F8\u4E4B\u95F4\u914D\u7F6E ssh \u514D\u5BC6\u767B\u5F55\uFF0C\u7528\u4F5C ceph \u5BC6\u94A5\u4E0E\u914D\u7F6E\u4FE1\u606F\u7684\u540C\u6B65\uFF1B</li><li>\u5728\u4E3B\u8282\u70B9\u542F\u52A8 mon \u8FDB\u7A0B\uFF0C\u67E5\u770B\u72B6\u6001\uFF0C\u5E76\u590D\u5236\u914D\u7F6E\u6587\u4EF6\u81F3\u5176\u4F59\u5404\u4E2A\u8282\u70B9\uFF0C\u5B8C\u6210 mon \u542F\u52A8\uFF1B</li><li>\u5728\u4E09\u4E2A\u73AF\u5883\u4E2D\u542F\u52A8 osd \u8FDB\u7A0B\u914D\u7F6E\u5B58\u50A8\u76D8\uFF0C\u5E76\u5728\u4E3B\u8282\u70B9\u73AF\u5883\u542F\u52A8 mgr \u8FDB\u7A0B\u3001rgw \u8FDB\u7A0B\uFF1B</li><li>\u521B\u5EFA\u5B58\u50A8\u6C60\u4E0E rbd \u5757\u8BBE\u5907\u955C\u50CF\uFF0C\u5E76\u5BF9\u521B\u5EFA\u597D\u7684\u955C\u50CF\u5728\u5404\u4E2A\u8282\u70B9\u8FDB\u884C\u6620\u5C04\u5373\u53EF\u5B9E\u73B0\u5757\u8BBE\u5907\u7684\u5171\u4EAB\uFF1B</li><li>\u5BF9\u5757\u8BBE\u5907\u8FDB\u884C PolarFS \u7684\u683C\u5F0F\u5316\u4E0E PolarDB \u7684\u90E8\u7F72\u3002</li></ol><div class="custom-container warning"><p class="custom-container-title">WARNING</p><p>\u64CD\u4F5C\u7CFB\u7EDF\u7248\u672C\u8981\u6C42 CentOS 7.5 \u53CA\u4EE5\u4E0A\u3002\u4EE5\u4E0B\u6B65\u9AA4\u5728 CentOS 7.5 \u4E0A\u901A\u8FC7\u6D4B\u8BD5\u3002</p></div><h2 id="\u73AF\u5883\u51C6\u5907" tabindex="-1"><a class="header-anchor" href="#\u73AF\u5883\u51C6\u5907" aria-hidden="true">#</a> \u73AF\u5883\u51C6\u5907</h2><pre><code>- \u4F7F\u7528\u7684\u865A\u62DF\u673A\u73AF\u5883\u5982\u4E0B\uFF1A

\`\`\`
IP                  hostname
192.168.1.173       ceph001
192.168.1.174       ceph002
192.168.1.175       ceph003
\`\`\`
- \u5B89\u88C5docker
    &gt; \u8BF4\u660E\uFF1A\u672C\u6559\u7A0B\u4F7F\u7528\u963F\u91CC\u4E91\u955C\u50CF\u7AD9\u63D0\u4F9B\u7684docker\u5305\u3002
    - \u5B89\u88C5docker\u4F9D\u8D56\u5305:

        \`\`\`
        yum install -y yum-utils device-mapper-persistent-data lvm2
        \`\`\`
    - \u5B89\u88C5\u5E76\u542F\u52A8docker\uFF1A

        \`\`\`
        yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
        yum makecache
        yum install -y docker-ce

        systemctl start docker
        systemctl enable docker
        \`\`\`
    - \u68C0\u67E5\u662F\u5426\u5B89\u88C5\u6210\u529F\uFF1A

        \`\`\`
        docker run hello-world
         \`\`\`
- \u914D\u7F6Essh\u514D\u5BC6\u767B\u5F55
    - \u5BC6\u94A5\u7684\u751F\u6210\u4E0E\u62F7\u8D1D\uFF1A

        \`\`\`
        ssh-keygen
        ssh-copy-id -i /root/.ssh/id_rsa.pub    root@ceph001
        ssh-copy-id -i /root/.ssh/id_rsa.pub    root@ceph002
        ssh-copy-id -i /root/.ssh/id_rsa.pub    root@ceph003
        \`\`\`
    - \u68C0\u67E5\u662F\u5426\u914D\u7F6E\u6210\u529F

        \`\`\`
        ssh root@ceph003
        \`\`\`
- \u4E0B\u8F7Dceph daemon

    \`\`\`bash
    docker pull ceph/daemon
    \`\`\`
</code></pre><h2 id="mon-\u90E8\u7F72" tabindex="-1"><a class="header-anchor" href="#mon-\u90E8\u7F72" aria-hidden="true">#</a> mon \u90E8\u7F72</h2><pre><code>- ceph001\u4E0Amon\u8FDB\u7A0B\u542F\u52A8

    \`\`\`
    docker run -d \\
               --net=host \\
               --privileged=true \\
               -v /etc/ceph:/etc/ceph \\
               -v /var/lib/ceph/:/var/lib/ceph/ \\
               -e MON_IP=192.168.1.173  \\
               -e CEPH_PUBLIC_NETWORK=192.168.1.0/24 \\
               --security-opt seccomp=unconfined \\
               --name=mon01 \\
               ceph/daemon mon
    \`\`\`
    **\u6CE8\u610F\uFF1A\u6839\u636E\u5B9E\u9645\u7F51\u7EDC\u73AF\u5883\u4FEE\u6539IP\u3001\u5B50\u7F51\u63A9\u7801\u4F4D\u6570\u3002**
- \u67E5\u770B\u5BB9\u5668\u72B6\u6001

    \`\`\`
    docker exec mon01 ceph -s
    cluster:
      id:     937ccded-3483-4245-9f61-e6ef0dbd85ca
      health: HEALTH_OK

    services:
      mon: 1 daemons, quorum ceph001 (age 26m)
      mgr: no daemons active
      osd: 0 osds: 0 up, 0 in

    data:
      pools:   0 pools, 0 pgs
      objects: 0 objects, 0 B
      usage:   0 B used, 0 B / 0 B avail
      pgs:
    \`\`\`
    **\u6CE8\u610F\uFF1A\u5982\u679C\u9047\u5230mon is allowing insecure global_id reclaim\u7684\u62A5\u9519\uFF0C\u4F7F\u7528\u4EE5\u4E0B\u547D\u4EE4\u89E3\u51B3\u3002**

    \`\`\`
    docker exec mon01 ceph config set mon   auth_allow_insecure_global_id_reclaim false
    \`\`\`
- \u751F\u6210\u5FC5\u987B\u7684keyring

    \`\`\`
    docker exec mon01  ceph auth get client.    bootstrap-osd -o /var/lib/ceph/bootstrap-osd/   ceph.keyring
    docker exec mon01 ceph auth get client. bootstrap-rgw -o /var/lib/ceph/bootstrap-rgw/    ceph.keyring
    \`\`\`
- \u914D\u7F6E\u6587\u4EF6\u540C\u6B65

    \`\`\`
    ssh root@ceph002 mkdir -p /var/lib/ceph
    scp -r /etc/ceph root@ceph002:/etc
    scp -r /var/lib/ceph/bootstrap* root@ceph002:/  var/lib/ceph
    ssh root@ceph003 mkdir -p /var/lib/ceph
    scp -r /etc/ceph root@ceph003:/etc
    scp -r /var/lib/ceph/bootstrap* root@ceph003:/  var/lib/ceph
    \`\`\`
- \u5728ceph002\u4E0Eceph003\u4E2D\u542F\u52A8mon

    \`\`\`bash
     docker run -d \\
        --net=host \\
        --privileged=true \\
        -v /etc/ceph:/etc/ceph \\
        -v /var/lib/ceph/:/var/lib/ceph/ \\
        -e MON_IP=192.168.1.174  \\
        -e CEPH_PUBLIC_NETWORK=192.168.1.0/24 \\
        --security-opt seccomp=unconfined \\
        --name=mon02 \\
        ceph/daemon mon

     docker run -d \\
        --net=host \\
        --privileged=true \\
        -v /etc/ceph:/etc/ceph \\
        -v /var/lib/ceph/:/var/lib/ceph/ \\
        -e MON_IP=1192.168.1.175  \\
        -e CEPH_PUBLIC_NETWORK=192.168.1.0/24 \\
        --security-opt seccomp=unconfined \\
        --name=mon03 \\
        ceph/daemon mon
    \`\`\`
- \u67E5\u770B\u5F53\u524D\u96C6\u7FA4\u72B6\u6001

    \`\`\`
    docker exec mon01 ceph -s
    cluster:
      id:     937ccded-3483-4245-9f61-e6ef0dbd85ca
      health: HEALTH_OK

    services:
      mon: 3 daemons, quorum ceph001,ceph002,   ceph003 (age 35s)
      mgr: no daemons active
      osd: 0 osds: 0 up, 0 in

    data:
      pools:   0 pools, 0 pgs
      objects: 0 objects, 0 B
      usage:   0 B used, 0 B / 0 B avail
      pgs:
    \`\`\`
    **\u6CE8\u610F\uFF1A\u4ECEmon\u8282\u70B9\u4FE1\u606F\u67E5\u770B\u662F\u5426\u6709\u6DFB\u52A0\u5728\u53E6\u5916\u4E24\u4E2A\u8282\u70B9\u521B\u5EFA\u7684mon\u6DFB\u52A0\u8FDB\u6765\u3002**
</code></pre><h2 id="osd-\u90E8\u7F72" tabindex="-1"><a class="header-anchor" href="#osd-\u90E8\u7F72" aria-hidden="true">#</a> osd \u90E8\u7F72</h2><pre><code>- osd\u51C6\u5907\u9636\u6BB5\uFF1A
    &gt;\u672C\u73AF\u5883\u7684\u865A\u62DF\u673A\u53EA\u6709\u4E00\u4E2A/dev/vdb\u78C1\u76D8\u53EF\u7528\uFF0C\u56E0\u6B64\u4E3A\u6BCF\u4E2A\u865A\u62DF\u673A\u53EA\u521B\u5EFA\u4E86\u4E00\u4E2Aosd\u8282\u70B9\u3002

    \`\`\`
    docker run --rm --privileged=true --net=host -  -ipc=host \\
                    --security-opt seccomp=unconfined \\
                    -v /run/lock/lvm:/run/lock/lvm:z \\
                    -v /var/run/udev/:/var/run/udev/:z \\
                    -v /dev:/dev -v /etc/ceph:/etc/ceph:z \\
                    -v /run/lvm/:/run/lvm/ \\
                    -v /var/lib/ceph/:/var/lib/ceph/:z \\
                    -v /var/log/ceph/:/var/log/ceph/:z \\
                    --entrypoint=ceph-volume \\
                    docker.io/ceph/daemon \\
                    --cluster ceph lvm prepare --bluestore --data /dev/vdb
    \`\`\`
    **\u6CE8\u610F\uFF1A\u4EE5\u4E0A\u547D\u4EE4\u5728\u4E09\u4E2A\u8282\u70B9\u90FD\u662F\u4E00\u6837\u7684\uFF0C\u53EA\u9700\u8981\u6839\u636E\u78C1\u76D8\u540D\u79F0\u8FDB\u884C\u4FEE\u6539\u8C03\u6574\u5373\u53EF\u3002**
- osd\u6FC0\u6D3B\u9636\u6BB5\uFF1A

    \`\`\`
    docker run -d --privileged=true --net=host  --pid=host --ipc=host \\
    				--security-opt  seccomp=unconfined \\
                    -v /dev:/dev \\
                    -v /etc/localtime:/etc/ localtime:ro \\
                    -v /var/lib/ceph:/var/lib/  ceph:z \\
                    -v /etc/ceph:/etc/ceph:z \\
                    -v /var/run/ceph:/var/run/  ceph:z \\
                    -v /var/run/udev/:/var/run/ udev/ \\
                    -v /var/log/ceph:/var/log/  ceph:z \\
                    -v /run/lvm/:/run/lvm/ \\
                    -e CLUSTER=ceph \\
                    -e  CEPH_DAEMON=OSD_CEPH_VOLUME_ACT  IVATE \\
                    -e CONTAINER_IMAGE=docker.io/   ceph/daemon \\
                    -e OSD_ID=0 \\
                    --name=ceph-osd-0 \\
                    docker.io/ceph/daemon
    \`\`\`
    **\u6CE8\u610F\uFF1A\u5404\u4E2A\u8282\u70B9\u9700\u8981\u4FEE\u6539OSD_ID\u4E0Ename\u5C5E\u6027\uFF0COSD_ID\u662F\u4ECE\u7F16\u53F70\u9012\u589E\u7684\uFF0C\u5176\u4F59\u8282\u70B9\u4E3AOSD_ID=1\u3001OSD_ID=2\u3002**
- \u67E5\u770B\u96C6\u7FA4\u72B6\u6001

    \`\`\`
    docker exec mon01 ceph -s
    cluster:
      id:     e430d054-dda8-43f1-9cda-c0881b782e17
      health: HEALTH_WARN
              no active mgr

    services:
      mon: 3 daemons, quorum ceph001,ceph002,   ceph003 (age 44m)
      mgr: no daemons active
      osd: 3 osds: 3 up (since 7m), 3 in (since     13m)

    data:
      pools:   0 pools, 0 pgs
      objects: 0 objects, 0 B
      usage:   0 B used, 0 B / 0 B avail
      pgs:
    \`\`\`
</code></pre><h2 id="mgr\u3001mds\u3001rgw-\u90E8\u7F72" tabindex="-1"><a class="header-anchor" href="#mgr\u3001mds\u3001rgw-\u90E8\u7F72" aria-hidden="true">#</a> mgr\u3001mds\u3001rgw \u90E8\u7F72</h2><pre><code>- \u4EE5\u4E0B\u547D\u4EE4\u5747\u5728ceph001\u8FDB\u884C\uFF1A

    \`\`\`
    docker run -d --net=host \\
                  --privileged=true \\
                  --security-opt seccomp=unconfined \\
                  -v /etc/ceph:/etc/ceph \\
                  -v /var/lib/ceph/:/var/lib/ceph/ \\
                  --name=ceph-mgr-0 \\
                  ceph/daemon mgr

    docker run -d --net=host \\
                  --privileged=true \\
                  --security-opt seccomp=unconfined \\
                  -v /var/lib/ceph/:/var/lib/ceph/ \\
                  -v /etc/ceph:/etc/ceph \\
                  -e CEPHFS_CREATE=1 \\
                  --name=ceph-mds-0 \\
                  ceph/daemon mds

    docker run -d --net=host \\
                  --privileged=true \\
                  --security-opt seccomp=unconfined \\
                  -v /var/lib/ceph/:/var/lib/ceph/ \\
                  -v /etc/ceph:/etc/ceph \\
                  --name=ceph-rgw-0 \\
                  ceph/daemon rgw
    \`\`\`
- \u67E5\u770B\u96C6\u7FA4\u72B6\u6001

    \`\`\`
    docker exec mon01 ceph -s
    cluster:
      id:     e430d054-dda8-43f1-9cda-c0881b782e17
      health: HEALTH_OK

    services:
      mon: 3 daemons, quorum ceph001,ceph002,   ceph003 (age 92m)
      mgr: ceph001(active, since 25m)
      mds: 1/1 daemons up
      osd: 3 osds: 3 up (since 54m), 3 in (since    60m)
      rgw: 1 daemon active (1 hosts, 1 zones)

    data:
      volumes: 1/1 healthy
      pools:   7 pools, 145 pgs
      objects: 243 objects, 7.2 KiB
      usage:   50 MiB used, 2.9 TiB / 2.9 TiB avail
      pgs:     145 active+clean
    \`\`\`
</code></pre><h2 id="rbd-\u5757\u8BBE\u5907\u521B\u5EFA" tabindex="-1"><a class="header-anchor" href="#rbd-\u5757\u8BBE\u5907\u521B\u5EFA" aria-hidden="true">#</a> rbd \u5757\u8BBE\u5907\u521B\u5EFA</h2><pre><code>&gt;\u4EE5\u4E0B\u547D\u4EE4\u5747\u5728\u5BB9\u5668mon01\u4E2D\u8FDB\u884C\u3002
- \u5B58\u50A8\u6C60\u7684\u521B\u5EFA\uFF1A

    \`\`\`
       docker exec -it mon01 bash
       ceph osd pool create rbd_polar
    \`\`\`
- \u521B\u5EFA\u955C\u50CF\u6587\u4EF6\u5E76\u67E5\u770B\u4FE1\u606F

    \`\`\`
    rbd create --size 512000 rbd_polar/image02
    rbd info rbd_polar/image02

    rbd image &#39;image02&#39;:
    size 500 GiB in 128000 objects
    order 22 (4 MiB objects)
    snapshot_count: 0
    id: 13b97b252c5d
    block_name_prefix: rbd_data.13b97b252c5d
    format: 2
    features: layering, exclusive-lock,     object-map, fast-diff, deep-flatten
    op_features:
    flags:
    create_timestamp: Thu Oct 28 06:18:07 2021
    access_timestamp: Thu Oct 28 06:18:07 2021
    modify_timestamp: Thu Oct 28 06:18:07 2021
    \`\`\`
- \u6620\u5C04\u955C\u50CF\u6587\u4EF6

    \`\`\`
    rbd map rbd_polar/image02

    rbd: sysfs write failed
    RBD image feature set mismatch. You can     disable features unsupported by the kernel  with &quot;rbd feature    disable rbd_polar/image02   object-map fast-diff deep-flatten&quot;.
    In some cases useful info is found in syslog -  try &quot;dmesg | tail&quot;.
    rbd: map failed: (6) No such device or address
    \`\`\`
    **\u6CE8\u610F\uFF1A\u67D0\u4E9B\u7279\u6027\u5185\u6838\u4E0D\u652F\u6301\uFF0C\u9700\u8981\u5173\u95ED\u624D\u53EF\u4EE5\u6620\u5C04\u6210\u529F\u3002\u5982\u4E0B\u8FDB\u884C\uFF1A\u5173\u95EDrbd\u4E0D\u652F\u6301\u7279\u6027\uFF0C\u91CD\u65B0\u6620\u5C04\u955C\u50CF\uFF0C\u5E76\u67E5\u770B\u6620\u5C04\u5217\u8868\u3002**

    \`\`\`
    rbd feature disable rbd_polar/image02   object-map fast-diff deep-flatten
    rbd map rbd_polar/image02
    rbd device list

    id  pool       namespace  image    snap  device
    0   rbd_polar             image01  -     /dev/  rbd0
    1   rbd_polar             image02  -     /dev/  rbd1
    \`\`\`
    &gt;\u6B64\u5904\u6211\u5DF2\u7ECF\u5148\u6620\u5C04\u4E86\u4E00\u4E2Aimage01\uFF0C\u6240\u4EE5\u6709\u4E24\u6761\u4FE1\u606F\u3002
- \u67E5\u770B\u5757\u8BBE\u5907
    &gt;\u56DE\u5230\u5BB9\u5668\u5916\uFF0C\u8FDB\u884C\u64CD\u4F5C\u3002\u67E5\u770B\u7CFB\u7EDF\u4E2D\u7684\u5757\u8BBE\u5907\uFF1A

    \`\`\`
    lsblk

    NAME                                                               MAJ:MIN RM  SIZE RO TYPE  MOUNTPOINT
    vda                                                                253:0    0  500G  0 disk
    \u2514\u2500vda1                                                             253:1    0  500G  0 part /
    vdb                                                                253:16   0 1000G  0 disk
    \u2514\u2500ceph--7eefe77f--c618--4477--a1ed--b4f44520dfc 2-osd--block--bced3ff1--42b9--43e1--8f63--e853b  ce41435
                                                                       252:0    0 1000G  0 lvm
    rbd0                                                               251:0    0  100G  0 disk
    rbd1                                                               251:16   0  500G  0 disk
    \`\`\`
    **\u6CE8\u610F\uFF1A\u5757\u8BBE\u5907\u955C\u50CF\u9700\u8981\u5728\u5404\u4E2A\u8282\u70B9\u90FD\u8FDB\u884C\u6620\u5C04\u624D\u53EF\u4EE5\u5728\u672C\u5730\u73AF\u5883\u4E2D\u901A\u8FC7lsblk\u547D\u4EE4\u67E5\u770B\u5230\uFF0C\u5426\u5219\u4E0D\u663E\u793A\u3002ceph002\u4E0Eceph003\u4E0A\u6620\u5C04\u547D\u4EE4\u4E0E\u4E0A\u8FF0\u4E00\u81F4\u3002**
</code></pre><h2 id="polardb-filesystem-\u5B89\u88C5\u90E8\u7F72" tabindex="-1"><a class="header-anchor" href="#polardb-filesystem-\u5B89\u88C5\u90E8\u7F72" aria-hidden="true">#</a> PolarDB-FileSystem \u5B89\u88C5\u90E8\u7F72</h2><pre><code>&gt;\u8BF7\u53C2\u8003 \u65B9\u5F0F3\uFF1A\u642D\u5EFA\u57FA\u4E8ENBD\u5171\u4EAB\u5B58\u50A8 \u2014 PolarDB-FileSystem\u5B89\u88C5\u90E8\u7F72
</code></pre><h2 id="polardb-for-postgresql-\u5185\u6838\u5B89\u88C5\u90E8\u7F72" tabindex="-1"><a class="header-anchor" href="#polardb-for-postgresql-\u5185\u6838\u5B89\u88C5\u90E8\u7F72" aria-hidden="true">#</a> PolarDB-for-PostgreSQL \u5185\u6838\u5B89\u88C5\u90E8\u7F72</h2><pre><code>&gt;\u8BF7\u53C2\u8003 \u65B9\u5F0F3\uFF1A\u642D\u5EFA\u57FA\u4E8ENBD\u5171\u4EAB\u5B58\u50A8 \u2014 PolarDB-for-PostgreSQL\u5185\u6838\u5B89\u88C5\u90E8\u7F72
</code></pre>`,20);function r(a,d){return o}var p=n(c,[["render",r]]);export{p as default};
