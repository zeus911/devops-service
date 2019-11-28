import { map } from 'lodash';

export default ({ formatMessage, projectId, envId, appId }) => {
  /**
   * 验证端口号
   * @param value
   * @param type
   * @param record
   */
  function checkPort(value, type, record) {
    const p = /^([1-9]\d*|0)$/;

    const isRepeat = record.dataSet.findIndex((r) => record.id !== r.id && r.get(type) === value) !== -1;

    const data = {
      typeMsg: '',
      min: 0,
      max: 65535,
      failedMsg: 'network.port.check.failed',
    };

    switch (type) {
      case 'targetPort':
        data.typeMsg = 'network.targetport.check.repeat';
        break;
      case 'nodePort':
        data.typeMsg = 'network.nport.check.repeat';
        data.min = 30000;
        data.max = 32767;
        data.failedMsg = 'network.nport.check.failed';
        break;
      default:
        data.typeMsg = 'network.port.check.repeat';
    }
    if (value) {
      if (
        p.test(value)
        && parseInt(value, 10) >= data.min
        && parseInt(value, 10) <= data.max
      ) {
        if (!isRepeat) {
          return true;
        } else {
          return formatMessage({ id: data.typeMsg });
        }
      } else {
        return formatMessage({ id: data.failedMsg });
      }
    }
  }


  return {
    fields: [
      {
        name: 'nodePort',
        type: 'string', 
        label: formatMessage({ id: 'network.config.nodePort' }),
        validator: checkPort,
      },
      {
        name: 'port',
        type: 'string', 
        label: formatMessage({ id: 'network.config.port' }),
        required: true,
        validator: checkPort,
      },
      {
        name: 'targetPort',
        type: 'string', 
        label: formatMessage({ id: 'network.config.targetPort' }),
        required: true,
        validator: checkPort,
        valueField: 'codePort',
        textField: 'resourceName',
        lookupAxiosConfig: {
          method: 'get',
          url: `/devops/v1/projects/${projectId}/env/app_services/list_port?env_id=${envId}&app_service_id=${appId}`,
          transformResponse: (resp) => {
            try {
              const data = JSON.parse(resp);
              if (data && data.failed) {
                return data;
              } else {
                return map(data, (item, index) => ({
                  ...item,
                  codePort: `${item.resourceName}: ${item.portValue}`,
                }));
              }
            } catch (e) {
              return resp;
            }
          },
        },
      },
      {
        name: 'protocol',
        type: 'string', 
        label: formatMessage({ id: 'ist.deploy.ports.protocol' }),
        dynamicProps: {
          required: ({ dataSet, record, name }) => {
            if (!dataSet.parent.current) return false;
            return dataSet.parent.current.get('protocol') === 'NodePort';
          },
        },
      },
    ],
    events: {
      update: ({ dataSet, record, name, value, oldValue }) => {
        if (name === 'targetPort') {
          if (value && value.indexOf(':') >= 0) {
            record.set(name, value.slice(value.indexOf(':') + 2));
          }
        }
      },
    },
  };
};
