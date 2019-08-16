package io.choerodon.devops.app.service;

import java.util.List;

import com.github.pagehelper.PageInfo;
import io.choerodon.base.domain.PageRequest;
import io.choerodon.devops.api.vo.DevopsEnvPodInfoVO;
import io.choerodon.devops.api.vo.DevopsEnvPodVO;
import io.choerodon.devops.infra.dto.DevopsEnvPodDTO;

/**
 * Created by Zenger on 2018/4/17.
 */
public interface DevopsEnvPodService {

    /**
     * @param projectId
     * @param envId
     * @param appServiceId
     * @param instanceId
     * @param pageRequest
     * @param searchParam
     * @return PageInfp
     */
    PageInfo<DevopsEnvPodVO> pageByOptions(Long projectId, Long envId, Long appServiceId, Long instanceId, PageRequest pageRequest, String searchParam);

    void setContainers(DevopsEnvPodVO devopsEnvPodVO);

    DevopsEnvPodDTO baseQueryById(Long id);

    DevopsEnvPodDTO baseQueryByPod(DevopsEnvPodDTO devopsEnvPodDTO);

    void baseCreate(DevopsEnvPodDTO devopsEnvPodDTO);

    List<DevopsEnvPodDTO> baseListByInstanceId(Long instanceId);

    void baseUpdate(DevopsEnvPodDTO devopsEnvPodDTO);

    PageInfo<DevopsEnvPodDTO> basePageByIds(Long projectId, Long envId, Long appServiceId, Long instanceId, PageRequest pageRequest, String searchParam);

    void baseDeleteByName(String name, String namespace);

    DevopsEnvPodDTO queryByNameAndEnvName(String name, String namespace);

    /**
     * 按资源用量列出环境下Pod信息
     *
     * @param envId 环境id
     * @param sort  排序条件
     * @return 环境下相关资源的数量
     */
    List<DevopsEnvPodInfoVO> queryEnvPodInfo(Long envId, String sort);

}
