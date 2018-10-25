package io.choerodon.devops.infra.dataobject;

import javax.persistence.Table;

import io.choerodon.mybatis.annotation.ModifyAudit;
import io.choerodon.mybatis.annotation.VersionAudit;
import io.choerodon.mybatis.domain.AuditDomain;

/**
 * Created by n!Ck
 * Date: 2018/10/25
 * Time: 16:52
 * Description:
 */

@VersionAudit
@ModifyAudit
@Table(name = "devops_env_user_permission")
public class EnvUserPermissionDO extends AuditDomain {
    private String loginName;
    private Long envId;
    private Boolean permission;

    public EnvUserPermissionDO() {
    }

    public EnvUserPermissionDO(String loginName, Long envId, Boolean permission) {
        this.loginName = loginName;
        this.envId = envId;
        this.permission = permission;
    }

    public String getLoginName() {
        return loginName;
    }

    public void setLoginName(String loginName) {
        this.loginName = loginName;
    }

    public Long getEnvId() {
        return envId;
    }

    public void setEnvId(Long envId) {
        this.envId = envId;
    }

    public Boolean getPermission() {
        return permission;
    }

    public void setPermission(Boolean permission) {
        this.permission = permission;
    }
}
