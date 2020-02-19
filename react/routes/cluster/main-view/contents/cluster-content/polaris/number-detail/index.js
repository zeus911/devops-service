import React, { Fragment, Suspense, useMemo, useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Spin, Button, Icon } from 'choerodon-ui';
import { useClusterMainStore } from '../../../../stores';
import { useClusterContentStore } from '../../stores';
import Radar from '../components/Radar';
import './index.less';

const checkGroup = [
  {
    checkType: 'successes',
    icon: 'check',
    text: 'checks passed',
  },
  {
    checkType: 'warnings',
    icon: 'priority_high',
    text: 'checks had warning',
  },
  {
    checkType: 'errors',
    icon: 'close',
    text: 'checks had errors',
  },
];

const categoryGroup = [
  {
    category_type: 'kubernetesVersion',
    name: 'Kubernetes版本',
    icon: 'saga_define',
  },
  {
    category_type: 'pods',
    name: 'Pods数量',
    icon: 'toll',
  },
  {
    category_type: 'nodes',
    name: '节点数量',
    icon: 'instance_outline',
  },
  {
    category_type: 'namespaces',
    name: '环境数量',
    icon: 'grain',
  },
];

const numberDetail = observer((props) => {
  const {
    intlPrefix,
    prefixCls,
  } = useClusterMainStore();

  const [num, setNum] = useState(null);
  const [loading, setLoading] = useState(false);

  const {
    contentStore: {
      setTabKey,
    },
    formatMessage,
    tabs: {
      POLARIS_TAB,
    },
    ClusterDetailDs,
    polarisNumDS,
  } = useClusterContentStore();

  useEffect(() => {

  }, []);

  const handleScan = () => {
    if (loading) {
      setNum(83);
      setLoading(false);
    } else {
      setNum(null);
      setLoading(true);
    }
    // setTimeout(() => {
    //   setNum(83);
    //   setLoading(false);
    // }, 3000);
  };

  function refresh() {

  }

  function renderNumPanel() {
    // eslint-disable-next-line react/no-array-index-key
    return checkGroup.map((item, key) => <div className={`${prefixCls}-number-check`} key={key}>
      <Icon type={item.icon} /> <span>{polarisNumDS.current ? (polarisNumDS.current.get(item.checkType) || '-') : '-'} {item.text}</span>
    </div>);
  }

  function renderDetailPanel(category) {
    // eslint-disable-next-line react/no-array-index-key
    return categoryGroup.map((item, key) => <div className={`${prefixCls}-number-category`} key={key}>
      <Icon type={item.icon} />
      <div className={`${prefixCls}-number-category-detail`}>
        <span>{item.name}</span>
        <span>{polarisNumDS.current ? (polarisNumDS.current.get(item.category_type) || '-') : '-'}</span>
      </div>
    </div>);
  }


  return (
    <div className={`${prefixCls}-number`}>

      {/* number详情的左半部分 */}
      <div className={`${prefixCls}-number-left`}>

        {/* 左半部分上部分 */}
        <div className={`${prefixCls}-number-leftTop`}>
          {/* 最新一次扫描时间 */}
          <span className={`${prefixCls}-number-leftTop-lastestDate`}>
            上次扫描时间：{polarisNumDS.current ? polarisNumDS.current.get('lastScanDateTime') : '-'}
          </span>

        </div>

        {/* 左半部分下部分 */}
        <div className={`${prefixCls}-number-leftDown`}>
          <div className={`${prefixCls}-number-leftDown-left`}>
            {renderNumPanel()}
          </div>
          {/* 扫描动画 */}
          <Radar
            num={polarisNumDS.current ? polarisNumDS.current.get('score') : ''}
            loading={loading}
          />
        </div>
      </div>

      {/* 下部分 */}
      <div className={`${prefixCls}-number-right`}>
        <div className={`${prefixCls}-number-right-list`}>
          {renderDetailPanel()}
        </div>
      </div>
    </div>
  );
});

export default numberDetail;
